import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  setDoc
} from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root',
})
export class FirestoreService {

  constructor(private firestore: Firestore) {}

  add(path: string, data: any) {
    const ref = collection(this.firestore,path);
    return addDoc(ref, data);
  }

  async getAll(path: string) {
    const ref = collection(this.firestore, path);
    const snap = await getDocs(ref);
    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async get(path: string, id: string) {
    const ref = doc(this.firestore, `${path}/${id}`);
    const snap = await getDoc(ref);
    return snap.exists() ? { id: snap.id, ...snap.data() } : null;
  }

  set(path: string, id: string, data: any) {
    const ref = doc(this.firestore, `${path}/${id}`);
    return setDoc(ref, data, { merge: true });
  }

  update(path: string, id: string, data: any) {
    const ref = doc(this.firestore, `${path}/${id}`);
    return updateDoc(ref, data);
  }

  delete(path: string, id: string) {
    const ref = doc(this.firestore, `${path}/${id}`);
    return deleteDoc(ref);
  }
  
}
