import { Inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from "firebase/auth"; 
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  auth = Inject(AngularFireAuth);
  firestore = Inject(AngularFirestore);
  
  getAuth() {
    return getAuth();
  }

  signIn(user: User){
    return signInWithEmailAndPassword(this.getAuth(), user.email, user.password);
  }
}
