import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { addDoc, collection, doc, getDocs, query } from 'firebase/firestore';

@Injectable({
    providedIn: 'root'
  })
  export class FirebaseNotificationService{
       
        constructor(private readonly afs: AngularFirestore){

        }
        getNotifications =async(uid: string | undefined)=>{

            const channelRef =  doc(this.afs.firestore, 'profile', uid||'');
            const messageRef = collection(channelRef, 'notification');

             const querySnapshot = await getDocs(query(messageRef));

             const userList: {}[] = [];
             querySnapshot.forEach((doc) => {
              
               userList.push(doc.data());
             });
             
             return userList;
          }
        notifyNewPost(Id:string[], message:any){

            Id.forEach((id:string)=>{

                const channelRef =  doc(this.afs.firestore, 'profile', id);
                const messageRef = collection(channelRef, 'notification');
                addDoc(messageRef, message);  
            } )
            console.log("Sent")
        }

        notifyNewComment(postAuthorUid:any,notification:any){
             const authorRef = doc(this.afs.firestore, 'profile',postAuthorUid)
             const notificationRef=collection(authorRef,'notification');
             addDoc(notificationRef,notification);

        }
        notifyNewFollower(){

        }
  }
