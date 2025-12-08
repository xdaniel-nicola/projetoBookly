import { Injectable } from '@angular/core';
import { Firestore, doc, getDoc, updateDoc, onSnapshot } from '@angular/fire/firestore';
import { Auth, user } from '@angular/fire/auth';
import { firstValueFrom } from 'rxjs';
import { Filesystem, Directory } from '@capacitor/filesystem'
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(
    private firestore: Firestore,
    private auth: Auth
  ) {}

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

async saveImageToFilesystem(base64Data: string, uid: string): Promise<string> {
  const fileName = `profile_${uid}.jpeg`;

  if (Capacitor.getPlatform() === 'web') {
    return base64Data;
  }

  await Filesystem.writeFile({
    path: fileName,
    data: base64Data.replace('data:image/jpeg;base64,',''),
    directory: Directory.Data
  });

  const fileUri = await Filesystem.getUri({
    path: fileName,
    directory: Directory.Data
  })

  return fileUri.uri;
}

async loadImage(path: string): Promise<string | null> {
  try {
    const file = await Filesystem.readFile({
      path,
      directory: Directory.Data
    });

    return `data:image/jpeg;base64,${file.data}`;
  }catch (err) {
    console.error("Erro ao ler foto local:", err);
    return null
  }
}

async saveImage(base64Data: string, userId: string) {
  const fileName = `profile_${userId}.jpeg`;

  const saved = await Filesystem.writeFile({
    path: fileName,
    directory: Directory.Data,
    data: base64Data
  });

  const fileUri = await Filesystem.getUri({
    path: fileName,
    directory: Directory.Data
  });

  return fileUri.uri
}

listenUser(uid: string, callback: (data: any) => void) {
  const userRef = doc(this.firestore, `users/${uid}`);
  return onSnapshot(userRef, (snap) => {
    callback({ id: snap.id, ...snap.data() });
  })
}
  
  async getCurrentUserData() {
    const currentUser = await firstValueFrom(user(this.auth));
    if (!currentUser) return null;

    const ref = doc(this.firestore, `users/${currentUser.uid}`);
    const snap = await getDoc(ref);

    if (!snap.exists()) return null;

    return snap.data();
  }
  
  updateUser(uid: string, data: any) {
    const ref = doc(this.firestore, 'users', uid);
    return updateDoc(ref, data);
  }
}
