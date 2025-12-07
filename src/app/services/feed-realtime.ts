import { Injectable, inject } from '@angular/core';
import { Database, ref, onValue } from '@angular/fire/database';
import { Observable } from 'rxjs'; 

@Injectable({
  providedIn: 'root',
})
export class FeedRealtime {

  private db = inject(Database);

  getFeed(): Observable<any[]> {
    return new Observable(observer => {
      const feedRef = ref(this.db, 'feed');

      onValue(feedRef, (snapshot) => {
        const data = snapshot.val();
        const list = data ? Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        })) :[];
        observer.next(list);
      }, (error) => {
        observer.error(error);
      })
    })
  }
  
}
