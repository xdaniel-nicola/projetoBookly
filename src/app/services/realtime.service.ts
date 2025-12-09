import { Injectable } from '@angular/core';
import { Database, ref, set, onValue } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class RealtimeService {

  constructor(private db: Database) {}

  savePostToRTDB(postId: string, post: any) {
    return set(ref(this.db, `posts/${postId}`), post);
  }

  saveLike(postId: string, userId: string) {
    return set(ref(this.db, `likes/${postId}/${userId}`), true);
  }

  saveComment(postId: string, commentId: string, comment: any) {
    return set(ref(this.db, `comments/${postId}/${commentId}`), comment);
  }

  listenToFeed(callback: (value: any) => void) {
    return onValue(ref(this.db, 'posts'), snapshot => {
      callback(snapshot.val());
    });
  }
}
