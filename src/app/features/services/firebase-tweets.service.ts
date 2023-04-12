import { Observable, shareReplay, take, map } from 'rxjs';
import { FirebaseAuthService } from '../../core/services/firebase-auth.service';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { DocumentReference,updateDoc,doc, getFirestore,  arrayUnion, increment, collection, query, getDocs, where } from 'firebase/firestore';
import { Post } from '../models/post.model';
import { now } from 'moment';
import * as firebase from 'firebase/app';
import { Firestore } from '@angular/fire/firestore';
 

@Injectable({
  providedIn: 'root'
})
export class FirebasePostsService {
 
  
  
  

  postDocumentRef$!: AngularFirestoreCollection<any>;
  postTweet$!: Observable<any>;
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

  postPosts(tweet: any) {
    
     
      this.postDocumentRef$.add(tweet)
      .then((docRef) => {
        const docId = docRef.id;
        console.log("Document written with ID:", docId);
      
        // Update the docId field with the actual doc ID
        docRef.update({id: docId}).then(() => {
          console.log("Document updated with docId:", docId);
        })
        .catch((error) => {
          console.error("Error updating document:", error);
        });
      })
      .catch((error) => {
        console.error("Error adding document:", error);
      });
      
       
  }
  postComments(comment: any, postId:String) {
    
    console.log(postId);
    this.tweetDocumentRef$ = this.afs.doc<Post>(`posts/${postId}`);

    this.tweetDocumentRef$.update({
      comments: arrayUnion(comment),
    }).then(()=>{
      console.log(this.postDocumentRef$+"noooooooo")
   });

    
  
    
    // 
  }
  increaseLikes(postId:String) {
    this.tweetDocumentRef$ = this.afs.doc<Post>(`posts/${postId}`);
    this.tweetDocumentRef$.update({
     likes: increment(1)
    }).then(()=>{
      console.log("liked the post")
   });

  }
  

  getAllPosts() {
    return this.postDocumentRef$.valueChanges();
  }

  fetchAllProfiles=async()=> {
    const q = query(collection(this.afs.firestore, "profile"));
    const querySnapshot = await getDocs(q);

    const userList: {}[] = [];
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
      userList.push(doc.data());
    });


    return userList;
  }

  fetchAllChannels=async()=> {
    const q = query(collection(this.afs.firestore, "channels"));
    const querySnapshot = await getDocs(q);

    const channeList: {}[] = [];
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
      channeList.push(doc.data());
    });
    
    return channeList;
  }

  fetchMessages=async(Id: any) =>{
    

    const q = query(collection(this.afs.firestore, "channels"),where("channelId","==",Id));
    const querySnapshot = await getDocs(q);
    let messages:any[]=[];
    console.log("searching channel wiht Id: "+ Id)

     querySnapshot.forEach(async(doc) => {
      // console.log(doc.id, " => ", doc.data());
      if (querySnapshot.size > 0) {
        
        const groupDoc = querySnapshot.docs[0];
        console.log(groupDoc.id);
         const tq=query(collection(this.afs.firestore,`channels/${groupDoc.id}/messages`));
         const tquerySnapshot = await getDocs(tq);
         tquerySnapshot.forEach((doc)=>{
          
          
          messages.push(doc.data());

         })
         
      }
       
    });
    
    return messages;
  }

}
