import { inject, Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, 
  Timestamp, 
  serverTimestamp,
  collection, 
  addDoc, 
  doc, 
  updateDoc, 
  arrayUnion, 
  arrayRemove,
  getDocs,
  getDoc,
  query,
  where,
  deleteDoc} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Notifications } from '../services/notifications'

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  
  userData: any = null;
  
  constructor(private firestore: Firestore, private auth: Auth, private notificationsService: Notifications) {}

  async savePost(review: any) {
    const currentUser = this.auth.currentUser;
    if (!currentUser) {
      throw new Error("Usuário não autenticado");
    }

    const userDoc = await getDoc(doc(this.firestore,`users/${currentUser.uid}`));
    const userData = userDoc.data();

    const postsRef = collection(this.firestore, 'posts');


    const formattedReview = {
      userId: currentUser?.uid || "anonymous",
      user: userData?.['username'] || currentUser.displayName || currentUser.email || "Anônimo",
      userAvatar: userData?.['profileImage'] || currentUser?.photoURL || "../../../assets/perfis/homem.jpeg",
      titleReview: review.titleReview,
      comment: review.comment || "",
      likes: 0,
      likedBy: [],
      comments: [],
      createdAt: Timestamp.now(),

      book: {
        title: review.title,
        image: review.cover,
        author: review.author,
        synopsis: review.synopsis,
        releaseDate: review.releaseDate,
        whereToFind: review.whereToFind,
        status: review.status,
        rating: review.rating,
        startDate: review.startDate
      }
    }
    return addDoc(postsRef, formattedReview);
  }

  async getUserPosts(userId: string) {
    const postsRef = collection(this.firestore, 'posts');
    const q = query(postsRef, where('userId', '==', userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }

  getPosts(): Observable<any[]> {
    return new Observable(observer => {
      const postsRef = collection(this.firestore, 'posts');
      const currentUser = this.auth.currentUser;
      
      // Usa getDocs para buscar uma única vez, sem tempo real
      getDocs(postsRef)
        .then((snapshot) => {
          const posts = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
            id: doc.id,
            ...doc.data(),
            liked: data['likedBy']?.includes(currentUser?.uid) || false
            };
          });
          
          // Ordena no cliente
          posts.sort((a: any, b: any) => {
            const timeA = a.createdAt?.seconds || 0;
            const timeB = b.createdAt?.seconds || 0;
            return timeB - timeA;
          });
          
          observer.next(posts);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

// getPosts(): Observable<any[]> {
//     const postsRef = collection(this.firestore, 'posts');
//     const q = query(postsRef, orderBy('createdAt', 'desc'));
//     return collectionData(q, { idField: 'id' }) as Observable<any[]>;
//   }


async toggleLike(review: any) {
  try {
    const currentUser = this.auth.currentUser;
    if (!currentUser) return;

    const reviewDoc = doc(this.firestore, `posts/${review.id}`);

    if (!review.liked) {
      // ADICIONAR LIKE
      await updateDoc(reviewDoc, {
        likes: review.likes + 1,
        likedBy: arrayUnion(currentUser.uid)
      });
    } else {
      // REMOVER LIKE
      await updateDoc(reviewDoc, {
        likes: Math.max(0, review.likes - 1),
        likedBy: arrayRemove(currentUser.uid)
      });
    }

  } catch (error) {
    console.error("Erro ao atualizar like:", error);
    review.liked = !review.liked; // desfaz mudança local
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
      comments: arrayUnion(comment)
    });

  } catch (error) {
    console.error("Erro ao adicionar comentário:", error);
  }
}

  async deletePost(postId: string){
    const postDoc = doc(this.firestore, `posts/${postId}`);
    await deleteDoc(postDoc);
  }

  async updatePost(postId: string, updatedData: any) {
    const postDoc = doc(this.firestore, `posts/${postId}`);
    await updateDoc(postDoc, updatedData);
  }
}
