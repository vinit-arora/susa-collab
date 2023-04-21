import { Observable, shareReplay, take, map, from } from 'rxjs';
import { FirebaseAuthService } from '../../core/services/firebase-auth.service';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { DocumentReference,updateDoc,doc, getFirestore,  arrayUnion, increment, collection, query, getDocs, where, setDoc, addDoc, getDoc, orderBy } from 'firebase/firestore';
import { Post } from '../models/post.model';
import { Comment } from '../models/comment.model';
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
    
 
    const s=postId.toString();
    console.log(comment);
   

    const postRef =  doc(this.afs.firestore, 'posts', s);
    const commentsRef = collection(postRef, 'comments');
    
      addDoc(commentsRef, comment);
        updateDoc(postRef,{
        comments: increment(1)
      })
     
    
     
  }

//  fetchComments=async(postId:any)=>{

//     const postRef = doc(this.afs.firestore, 'posts', postId);
//     const postSnap = await getDoc(postRef);
//     const post = postSnap.data() as Post;

//     const commentsQuery = query(collection(this.afs.firestore, `posts/${postId}/comments`),orderBy('createdAt','desc'));
//     const commentsSnap = await getDocs(commentsQuery);
 
//     const commentsList:Comment[]=[];
//     const comments = commentsSnap.docs.map((doc) => { 
//     commentsList.push(doc.data() as Comment)
//   console.log(doc.data())});

//     return commentsList;
   
//       }
      fetchComments=async(postId: any): Promise<Observable<any[]>> => {
        const commentsRef = this.afs.collection(`posts/${postId}/comments`, ref => {
          return ref.orderBy('createdAt', 'desc');
        });
        return commentsRef.valueChanges({ idField: 'id' }).pipe(
          map(comments => {
            // Add the comment ID to each comment object
            console.log(postId);
            return comments.map(comment => {
              // console.log(comment)
              return { ...comment};
            });
          })
        );
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

  

  

}
