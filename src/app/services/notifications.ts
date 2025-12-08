import { CurrencyPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { Firestore
  ,collection
  ,addDoc
  ,query
  ,where
  ,Timestamp
  ,orderBy
  ,updateDoc
  ,doc
  ,getDocs
  ,collectionData
  ,onSnapshot
 } from '@angular/fire/firestore';
 import { Observable, of, from} from 'rxjs';
 import { switchMap, map } from 'rxjs/operators';


 export interface Notification {
  id?: string;
  type: 'like' | 'comment';
  postId: string;
  postOwnerId: string;
  triggeredBy: string;
  triggeredByUsername: string;
  triggeredByAvatar: string | null;
  bookTitle: string;
  bookImage: string;
  commentText?: string;
  userDataLoaded?: boolean;
  createdAt: any;
  read: boolean;
 }

@Injectable({
  providedIn: 'root',
})
export class Notifications {
  constructor(private firestore: Firestore, private auth: Auth) {}

  async createLikeNotification(
    postId: string, 
    postOwnerId: string, 
    bookTitle: string, 
    bookImage: string,
    triggeredByUsername: string,
    triggeredByAvatar: string | null
  ) {
    const currentUser = this.auth.currentUser;
    if(!currentUser || currentUser.uid === postOwnerId) {
      return;
    }

    const notificationsRef = collection(this.firestore, 'notifications');

    const notification: Notification = {
      type: 'like',
      postId,
      postOwnerId,
      triggeredBy: currentUser.uid,
      triggeredByUsername: triggeredByUsername || 'Usuário',
      triggeredByAvatar: triggeredByAvatar || null,
      bookTitle: bookTitle || '',
      bookImage: bookImage || '',
      createdAt: Timestamp.now(),
      read: false
    };
    ;

    return addDoc(notificationsRef, notification)
  }

  async createCommentNotification (
    postId: string, 
    postOwnerId: string, 
    bookTitle: string, 
    bookImage: string,
    triggeredByUsername: string,
    triggeredByAvatar: string | null,
    commentText: string
  ) {
    const currentUser = this.auth.currentUser;
    if(!currentUser || currentUser.uid === postOwnerId) {
      return;
    }

    const notificationsRef = collection(this.firestore, 'notifications');

    const notification: Notification = {
      type: 'comment',
      postId,
      postOwnerId,
      triggeredBy: currentUser.uid,
      triggeredByUsername: triggeredByUsername || 'Usuário',
      triggeredByAvatar: triggeredByAvatar || null,
      bookTitle: bookTitle || '',
      bookImage: bookImage || '',
      commentText: commentText || '',
      createdAt: Timestamp.now(),
      read: false
    };

    return addDoc(notificationsRef, notification);
  }

getUserNotifications(): Observable<Notification[]> {
  const notificationsRef = collection(this.firestore, 'notifications');
  const q = query(
    notificationsRef,
    where('postOwnerId', '==', this.auth.currentUser?.uid),
    orderBy('createdAt', 'desc')
  );

  return new Observable(subscriber => {
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notifications = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Notification[];

      subscriber.next(notifications)
    });
    return () => unsubscribe();
  })
}



    async markAsRead(notificationId: string) {
      const notificationDoc = doc(this.firestore, `notifications/${notificationId}`);
      await updateDoc(notificationDoc, {
        read:true
      });
    }

    async markAllAsRead() {
      const currentUser = this.auth.currentUser;
      if(!currentUser) return;

      const notificationsRef = collection(this.firestore, 'notifications');
      const q = query(
        notificationsRef,
        where('postOwnerId', '==', currentUser.uid),
        where('read', '==', false)
      );
      const snapshot = await getDocs(q);
      const updates = snapshot.docs.map(docSnap =>
        updateDoc(doc(this.firestore, `notifications/${docSnap.id}`), { read: true })
      );
      await Promise.all(updates);
    }

    async getUnreadCount(): Promise<number> {
      const currentUser = this.auth.currentUser;
      if (!currentUser) return 0;

      const notificationsRef = collection(this.firestore, 'notifications');
      const q = query(
        notificationsRef,
        where('postOwnerId', '==', currentUser.uid),
        where('read', '==', false)
      );

      const snapshot = await getDocs(q);
      return snapshot.size;
    }
}  
      
