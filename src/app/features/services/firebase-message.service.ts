import { Observable, shareReplay, take, map } from 'rxjs';
import { FirebaseAuthService } from '../../core/services/firebase-auth.service';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import {  updateDoc, doc, arrayUnion, collection, query, getDocs, addDoc, getDoc, orderBy } from 'firebase/firestore';
import { Message } from '../models/message.model';
 

@Injectable({
  providedIn: 'root'
})
export class FirebaseMessageService {





  postDocumentRef$!: AngularFirestoreCollection<any>;
  postMessages$!: Observable<any>;
  postComment$!: Observable<any>;
  tweetDocumentRef$!: AngularFirestoreDocument<any>;



  constructor(private readonly afs: AngularFirestore, private afAuth: FirebaseAuthService) {
    afAuth.getFirebaseUserState().pipe(map(user => {
      if (user) {
        this.postDocumentRef$ = this.afs.collection(`posts`, ref =>
          ref.orderBy('createdAt', 'desc'));
      }
    }), take(1)).subscribe();


  }

  fetchAllChannels = async () => {
    const q = query(collection(this.afs.firestore, "channels"));
    const querySnapshot = await getDocs(q);

    const channeList: Map<string, any> = new Map();
    let i = 0;
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      channeList.set(querySnapshot.docs[i++].id, doc.data());

    });

    return channeList;
  }

  fetchMessages = async (Id: string) => {



    let messages: any[] = [];

    const messageRef = this.afs.collection(`channels/${Id}/messages`, ref => {
      return ref.orderBy('createdAt', 'asc');
    });
    return messageRef.valueChanges()



    // })
    // return messages;
  }

  sendMessage = async (Id: any, message: Message) => {

    const channelRef = doc(this.afs.firestore, 'channels', Id.toString());
    const messageRef = collection(channelRef, 'messages');
    await addDoc(messageRef, message);
    console.log("Sent")
  }

  joinChannel = async (channelName: any, email: any) => {
    const channelRef = doc(this.afs.firestore, 'channels', channelName.toString());
    await updateDoc(channelRef, {
      requestList: arrayUnion(email.toString())
    });



  }



}

