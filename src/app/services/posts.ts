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

import { getDatabase, ref, set, Database, update, onValue } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {

  constructor(
    private firestore: Firestore,
    private auth: Auth
  ) {}

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
    ...review,
    createdAt: Date.now(),
    likes: 0,
    comments: []
  });
}

getPostsRealtime(): Observable<any[]> {
  return new Observable((observer) => {
    const feedRef = ref(this.db, 'posts');

    onValue(feedRef, (snapshot) => {
      const data = snapshot.val() || {};

      const posts = Object.entries(data).map(([id, post]: any) => ({
        id,
        ...post
      }));

      posts.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

      observer.next(posts)
    })
  })
}


  async getUserPosts(userId: string) {
    const postsRef = collection(this.firestore, 'posts');
    const q = query(postsRef, where('userId', '==', userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async toggleLike(review: any) {
    try {
      const currentUser = this.auth.currentUser;
      if (!currentUser) return;

      const reviewDocRef = doc(this.firestore, `posts/${review.id}`);
      const snap = await getDoc(reviewDocRef);

      if (!snap.exists()) return;

      const data: any = snap.data();
      const likedBy: string[] = data.likedBy || [];
      const hasLiked = likedBy.includes(currentUser.uid);

      const newLikes = hasLiked ? Math.max(0, data.likes - 1) : (data.likes + 1);

      await updateDoc(reviewDocRef, {
        likes: newLikes,
        likedBy: hasLiked
          ? likedBy.filter(uid => uid !== currentUser.uid)
          : [...likedBy, currentUser.uid]
      });

      return {
        liked: !hasLiked,
        likes: newLikes
      };
    } catch (error) {
      console.error("Erro ao atualizar like:", error);
      throw error;
    }
  }

  async addComment(reviewId: any, commentText: any) {
    try {
      const currentUser = this.auth.currentUser;
      if (!currentUser) return;

      const userDoc = await getDoc(doc(this.firestore, `users/${currentUser.uid}`));
      const userData = userDoc.data();

      const comment = {
        userId: currentUser.uid,
        user: userData?.['username'] || currentUser.displayName || currentUser.email,
        avatar: userData?.['profileImage'] || currentUser.photoURL,
        text: commentText,
        timestamp: Timestamp.now()
      };

      const reviewDoc = doc(this.firestore, `posts/${reviewId}`);
      await updateDoc(reviewDoc, {
        comments: [...( (await getDoc(reviewDoc)).data()?.['comments'] || [] ), comment]
      });

    } catch (error) {
      console.error("Erro ao adicionar comentário:", error);
    }
  }

  async deletePost(postId: string) {
    await deleteDoc(doc(this.firestore, `posts/${postId}`));
  }

  async updatePost(postId: string, updatedData: any) {
    await updateDoc(doc(this.firestore, `posts/${postId}`), updatedData);
  }

  getPosts() {
    return this.getPostsRealtime();
  }
}
