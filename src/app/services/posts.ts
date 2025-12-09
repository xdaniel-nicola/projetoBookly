import { inject, Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  Firestore,
  Timestamp,
  collection,
  addDoc,
  doc,
  updateDoc,
  getDocs,
  getDoc,
  query,
  where,
  deleteDoc
} from '@angular/fire/firestore';

import { 
  ref, 
  set, 
  Database, 
  update, 
  onValue,
  push  } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Notifications } from './notifications';

@Injectable({
  providedIn: 'root',
})
export class PostsService {

  constructor(
    private firestore: Firestore,
    private auth: Auth,
 
  ) {}
  private notificationsService = inject(Notifications)
  private db = inject(Database);

async savePost(review: any) {
  const currentUser = this.auth.currentUser;
  if (!currentUser) throw new Error("Usuário não autenticado");

  const userDoc = await getDoc(doc(this.firestore, `users/${currentUser.uid}`));
  const userData = userDoc.data();

  const postsRef = collection(this.firestore, 'posts');

  const formattedReview = {
    userId: currentUser.uid,
    user: userData?.['username'] || currentUser.displayName || currentUser.email || "Anônimo",
    userAvatar: userData?.['profileImage'] || currentUser.photoURL || "../../../assets/perfis/homem.jpeg",
    
    titleReview: review.titleReview,
    comment: review.comment || "",

    likes: 0,
    likedBy: [],
    comments: [],

    createdAt: Timestamp.now(),

    book: {
      title: review.title || "",
      image: review.cover || "",
      author: Array.isArray(review.author) ? [...review.author] : review.author || "",
      synopsis: review.synopsis || "",
      releaseDate: review.releaseDate || "",
      status: review.status || "",
      rating: Number(review.rating) || 0,
      startDate: review.startDate || "",
      whereToFind: review.whereToFind ? JSON.parse(JSON.stringify(review.whereToFind)) : null
    }
  };

  const docRef = await addDoc(postsRef, formattedReview);

  await this.savePostToRTDB(docRef.id, formattedReview);

  return docRef;
}

  async savePostToRTDB(postId: string, review: any) {
  const postRef = ref(this.db, `posts/${postId}`);
  console.log("ENVIANDO PARA RTDB: ", postId, review)

  await set(postRef, {
    id: postId,
    userId: review.userId,
    user: review.user,
    userAvatar: review.userAvatar,
    titleReview: review.titleReview,
    comment: review.comment,
    createdAt: Date.now(),
    likes: review.likes,
    likedBy: review.likedBy,
    comments: Array.isArray(review.comments) ? review.comments : [],
    book: review.book
  });
}

getPostsRealtime(): Observable<any[]> {
  const currentUser = this.auth.currentUser;

  return new Observable((observer) => {
    const feedRef = ref(this.db, 'posts');

    onValue(feedRef, (snapshot) => {
      const data = snapshot.val() || {};

      const posts = Object.entries(data).map(([id, post]: any) => {
        const likedBy = post.likedBy || [];

        return {
          id,
          ...post,
          comments: post.comments
            ? Object.values(post.comments).map((c: any) => ({
              ...c,
              userDataLoaded: false
            }))
            : [],

          liked: currentUser ? likedBy.includes(currentUser.uid) : false
        };
      });

      posts.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

      observer.next(posts);
    });
  });
}



  async getUserPosts(userId: string) {
    const postsRef = collection(this.firestore, 'posts');
    const q = query(postsRef, where('userId', '==', userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async toggleLike(review: any) {
    const currentUser = this.auth.currentUser;
    if(!currentUser) return;

    const currentUserDoc = await getDoc(doc(this.firestore, `users/${currentUser.uid}`));
    const currentUserData = currentUserDoc.data();

    const triggeredUsername =
    currentUserData?.['username'] ||
    currentUser.displayName || 
    currentUser.email ||
    "Usuário";

    const triggeredAvatar =
    currentUserData?.['profileImage'] ||
    currentUser.photoURL ||
    "../../../assets/perfis/homem.jpeg"

    const reviewDocRef = doc(this.firestore, `posts/${review.id}`);
    const snap = await getDoc(reviewDocRef);

    if(!snap.exists()) return;

    const data: any = snap.data();
    const likedBy: string[] = data.likedBy || [];
    const hasLiked = likedBy.includes(currentUser.uid);

    const newLikes = hasLiked ? Math.max(0, data.likes - 1) : data.likes + 1;

    await updateDoc(reviewDocRef, {
      likes: newLikes,
      likedBy: hasLiked
      ? likedBy.filter(uid => uid !== currentUser.uid)
      : [...likedBy, currentUser.uid]
    });

    const likeRef = ref(this.db, `posts/${review.id}`);

    await update(likeRef, {
      likes: newLikes,
      likedBy: hasLiked
      ? likedBy.filter(uid => uid !== currentUser.uid)
      : [...likedBy, currentUser.uid]
    })
    if (!hasLiked) {
    await this.notificationsService.createLikeNotification(
      review.id,
      review.userId, // dono do post
      review.book?.title,
      review.book?.image,
      triggeredUsername,
      triggeredAvatar
    );
  }
  return {
    liked: !hasLiked,
    likes: newLikes
  }
    
  }

  async addComment(postId: string, commentText: string) {
    const currentUser = this.auth.currentUser;
    if (!currentUser) return;

    const userDoc = await getDoc(doc(this.firestore, `users/${currentUser.uid}`));
    const userData = userDoc.data();


    const comment = {
      userId: currentUser.uid,
      text: commentText,
      timestamp: Timestamp.now()
    };

    const triggeredUsername = userData?.['username'] || 
    currentUser.displayName || 
    currentUser.email || "Usuário"; 
    
    const triggeredAvatar = userData?.['profileImage'] || 
    currentUser.photoURL || 
    null;

    const postRef = doc(this.firestore, `posts/${postId}`);
    const snap = await getDoc(postRef);

    const postData: any = snap.data();
    const updatedComments = [...(postData.comments || []), comment];

    await updateDoc(postRef, {
      comments: updatedComments
    });
    
    const commentRef = ref(this.db, `posts/${postId}/comments`);

    await push(commentRef, comment);

    await this.notificationsService.createCommentNotification(
    postId,
    postData.userId,
    postData.book?.title,
    postData.book?.image,
    triggeredUsername,
    triggeredAvatar,
    commentText
  );

    return comment;

  }

  async deletePost(postId: string) {
    await deleteDoc(doc(this.firestore, `posts/${postId}`));
    await set(ref(this.db, `posts/${postId}`), null);
  }

  async updatePost(postId: string, updatedData: any) {
    await updateDoc(doc(this.firestore, `posts/${postId}`), updatedData);
    await update(ref(this.db, `posts/${postId}`), updatedData)
  }

  getPosts() {
    return this.getPostsRealtime();
  }
}
