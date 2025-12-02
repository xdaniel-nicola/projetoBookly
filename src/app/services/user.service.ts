import { Injectable } from '@angular/core';
import { Firestore, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { Auth, user } from '@angular/fire/auth';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(
    private firestore: Firestore,
    private auth: Auth
  ) {}
  
  async getCurrentUserData() {
    const currentUser = await firstValueFrom(user(this.auth));
    if (!currentUser) return null;

    const ref = doc(this.firestore, `users/${currentUser.uid}`);
    const snap = await getDoc(ref);

    if (!snap.exists()) return null;

    return snap.data();
  }
  
  updateUser(uid: string, data: any) {
    return updateDoc(doc(this.firestore, 'users', uid), data)
  }
}
