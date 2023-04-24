import { Observable, shareReplay, take, map } from 'rxjs';
import { FirebaseAuthService } from '../../core/services/firebase-auth.service';
import { FeatureFacadeService } from '../services/feature-facade.service';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { DocumentReference,updateDoc,doc, getFirestore,  arrayUnion, increment, collection, query, getDocs, where, setDoc, addDoc, getDoc, orderBy } from 'firebase/firestore';
import { Message } from '../models/message.model';
import { now } from 'moment';
import * as firebase from 'firebase/app';
import { Firestore } from '@angular/fire/firestore';
 

@Injectable({
  providedIn: 'root'
})
export class FirebaseFollowService {
    constructor(private readonly afs: AngularFirestore){

    }
    followUser=async(currentId:string,id:string)=>{
      
        const profileRef =  doc(this.afs.firestore, 'profile', currentId);
        await updateDoc(profileRef, {
          following: arrayUnion(id)
        })
    
    

      const profileRef2 =  doc(this.afs.firestore, 'profile', id);
      await updateDoc(profileRef2, {
        followers: arrayUnion(currentId)
    });

    }
}
