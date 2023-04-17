import { CoreFacadeService } from '../../core/services/core-facade.service';
import { FirebasePostsService } from './firebase-tweets.service';
import { FirebaseMessageService } from './firebase-message.service';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as PostsAction from '../store/posts/post-store.actions';
import { selectAllFeedPosts } from '../store/posts/post-store.selectors';
import { Message } from '../models/message.model';
import { Comment } from '../models/comment.model';
 

@Injectable({
  providedIn: 'root'
})
export class FeatureFacadeService {
 
  
  
   

  // private http= HttpClient;
  constructor(
    private store: Store<any>,
    private coreFacade: CoreFacadeService,
    private firebasePostService: FirebasePostsService,
    private firebaseMessageService:FirebaseMessageService
    
   ) { }

  logoutUser() {
    this.coreFacade.logoutUser();
  }

  getFirebaseUserInfo() {
    return this.coreFacade.getCurrentUserInfo();
  }

  getUserProfile() {
    return this.coreFacade.getUserProfile();
  }

  postPost(comment: any) {
    return this.firebasePostService.postPosts(comment);
  }
  postComment(comment: any,postId: String) {
    return this.firebasePostService.postComments(comment,postId);
  }

  increaseLike(postId: String) {
    return this.firebasePostService.increaseLikes(postId);
  }
   
  fetchComments(postId: any){
    return this.firebasePostService.fetchComments(postId);
  }
  getAllPosts() {
   let x= this.store.select(selectAllFeedPosts);
   console.log(x);
   console.log("hi");
   return x;
  }
 
  fetchAllProfiles(){
    return this.firebasePostService.fetchAllProfiles();
  }
  fetchAllPosts() {
    console.log("!!!!!!!!!!!!");
    console.log(PostsAction.fetchAllPosts());
    this.store.dispatch(PostsAction.fetchAllPosts());
  }
  
  fetchAllChannels(){
    return this.firebaseMessageService.fetchAllChannels()
  }

  fetchMessages(channelName: string) {
   return this.firebaseMessageService.fetchMessages(channelName);
  }
  sendMessage(channelId: string, message: any) {
   return this.firebaseMessageService.sendMessage(channelId,message);
  }
  joinChannel(channelName: any, email:any) {
   return this.firebaseMessageService.joinChannel(channelName,email);
  }
  

}
