import { Injectable } from '@angular/core';
import { Firestore, doc, getDoc, updateDoc, onSnapshot } from '@angular/fire/firestore';
import { Auth, signOut } from '@angular/fire/auth';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { onAuthStateChanged } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(
    private firestore: Firestore,
    private auth: Auth
  ) {}

async logout() {
  return signOut(this.auth);
}

getCurrentUserData(): Promise<any> {
  return new Promise((resolve) => {
    onAuthStateChanged(this.auth, async (user) => {
      if (!user) return resolve(null);

      const ref = doc(this.firestore, 'users', user.uid);
      const snap = await getDoc(ref);

      resolve(snap.data());
    })
  })
}
async pickImageFromGallery(): Promise<string | null> {
  try {
    const img = await Camera.getPhoto({
      quality: 85,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos
    });

    return img.dataUrl || null;
  } catch (err) {
    console.log("Usuário cancelou escolha de foto");
    return null;
  }
}

listenUser(uid: string, callback: (data: any) => void) {
  const userRef = doc(this.firestore, `users/${uid}`);
  return onSnapshot(userRef, (snap) => {
    callback({ id: snap.id, ...snap.data() });
  })
}
  
  // async getCurrentUserData() {
  //   const currentUser = await firstValueFrom(user(this.auth));
  //   if (!currentUser) return null;

  //   const ref = doc(this.firestore, `users/${currentUser.uid}`);
  //   const snap = await getDoc(ref);

  //   if (!snap.exists()) return null;

  //   return snap.data();
  // }
  
  updateUser(uid: string, data: any) {
    const ref = doc(this.firestore, 'users', uid);
    return updateDoc(ref, data);
  }
}
