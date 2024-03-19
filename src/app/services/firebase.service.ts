import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from "firebase/auth"; 
import { User } from '../models/user.model';
import { deleteDoc, doc, getDoc, getFirestore, setDoc } from "@angular/fire/firestore";
import { UtilsService } from './utils.service';
import { addDoc, collection, updateDoc } from 'firebase/firestore';
import { ref, getStorage, uploadString, getDownloadURL, deleteObject } from 'firebase/storage';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  dataRef: AngularFirestoreCollection<User>;
  constructor(private auth: AngularFireAuth, private firestore: AngularFirestore, private utils: UtilsService,) {}

  getAuth() {
    return getAuth();
  }

  signIn(user: User){
    return signInWithEmailAndPassword(this.getAuth(), user.email, user.password);
  }
  signUp(user: User){
    return createUserWithEmailAndPassword(this.getAuth(), user.email, user.password);
  }
  updateUser(displayName: any){
    return updateProfile(this.getAuth().currentUser, {displayName});
  }
  setDocument(path: any, data: any){
    return setDoc(doc(getFirestore(), path), data);
  }
  async getDocument(path: any){{
    return (await getDoc(doc(getFirestore(), path))).data();
  }} 
  sendRecorveryEmail(email: string){
    return sendPasswordResetEmail(this.getAuth(), email);
  }
  signOut(){
    getAuth().signOut();
    localStorage.removeItem('user');
    this.utils.routerlink('auth');
  }
  addDocument(path: any, data: any){
    return addDoc(collection(getFirestore(), path), data);
  }

  async updateImg(path: any, data_url: any){
    return uploadString(ref(getStorage(), path), data_url, 'data_url')
    .then(() => {
      return getDownloadURL(ref(getStorage(), path));
    })
  }

  getCollectionData(path: any) : AngularFirestoreCollection<User>{
    try {
      this.dataRef = this.firestore.collection(path, ref => ref.orderBy('name', 'asc'));
      return this.dataRef;
    } catch (error) {
      return null;
    }
  }

  async getFilePath(url: string){
    return ref(getStorage(), url).fullPath;
  }

  updateDocument(path: any, data: any){
    return updateDoc(doc(getFirestore(), path), data);
  }

  deleteDocument(path: any){
    return deleteDoc(doc(getFirestore(), path));
  }

  deleteFile(path: any){
    return deleteObject(ref(getStorage(), path)); 
  }
}