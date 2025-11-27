import { Injectable } from '@angular/core';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
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
}
