import { UserProfile } from '../../../core/models/user-profile.model';
import { Component, Input, OnChanges, OnInit, SimpleChanges,QueryList, ViewChild,ViewChildren, ElementRef, AfterViewChecked} from '@angular/core';
import { IconDefinition, faHeart, faRetweet, faShareSquare, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { Post } from '../../models/post.model';
import { Comment } from '../../models/comment.model';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import {  faImages, faLaughSquint, faPhotoVideo, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { FeatureFacadeService } from '../../services/feature-facade.service';
 
 
import 'firebase/compat/database';
import { Observable } from 'rxjs';
import { Notification } from '../../models/notification.model';
 
 
 



 

@Component({
  selector: 'twitter-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnChanges,OnInit{

   
 
  @ViewChild('textContainer', { static: false }) textContainer!: ElementRef;
  @ViewChild('fileInput') fileInput!: ElementRef;
  @Input() feedPosts: Post[] = [];
  @Input() profile!: Partial<UserProfile>;
  @ViewChildren('textInput') textInputs!: QueryList<ElementRef>;
  @ViewChildren('textContainer') textContainers!: QueryList<ElementRef>;

   
  faHeart: IconDefinition = faHeart;
  faRetweet: IconDefinition = faRetweet;
  faShare: IconDefinition = faShareSquare;
  faComment: IconDefinition = faCommentDots;
  textArea: string = "";
  url_matches: any = [];
  faPicture: IconDefinition = faImages;
  faEmoji: IconDefinition = faLaughSquint;
  faGif: IconDefinition = faPhotoVideo;
  faSchedule: IconDefinition = faCalendarAlt;
  faClose: IconDefinition = faTimesCircle
  comment:any;
  isHidden: boolean[]=[];
  emojiToggle: boolean = false;
  commentList: Map<String,Observable< any[]>> = new Map();
  
  currentCommentIndex:number=0;
  


   constructor(private featureFacade: FeatureFacadeService, private elRef: ElementRef) { }

   ngOnInit(){
     
    console.log("rishu");
    console.log(this.profile);
     
   }
    
   
  ngOnChanges(): void {

    console.log('feedPosts', this.feedPosts)
    this.isHidden=Array(this.feedPosts.length).fill(true);
    
  }
  

  textInputHandler($event: any ) {
    this.textArea = $event.target.textContent;
    console.log(this.textArea)
    this.handleUrlMatches();
  }
  
  handleUrlMatches() {
    const urlMatches = this.textArea.match(/\b(http|https)?:\/\/\S+/gi) || [];
    urlMatches.forEach(url => {
      this.textInputs.toArray()[this.currentCommentIndex].nativeElement.innerHTML = this.textInputs.toArray()[this.currentCommentIndex].nativeElement.innerHTML.replace(url, ``);
      this.url_matches.push(url);
    });
  }
  
  async handleComment(postId:String, postAuthorUid:any) {
     
    console.log("postText" )
     
    const postText = this.textContainers.toArray()[this.currentCommentIndex].nativeElement.innerHTML;
    const comment: Partial<Comment> = {
                                    content:postText,
                                     createdAt: (new Date()).toString(),
                                      author:{
                                        name: this.profile.displayName || "",
                                        email:this.profile.email|| ""}
                                     
                                 }

    const notification: Notification={
          content:this.profile.displayName+" commented on your post",
          seen:false,
          createdAt:new Date()
    }      
                                
   
    
     


    try {
      await this.featureFacade.postComment(comment,postId);
      this.textInputs.toArray()[this.currentCommentIndex].nativeElement.innerHTML = "";
      this.fileInput.nativeElement.innerHTML="";
      this.textArea = "";
      this.url_matches = []
      this.featureFacade.notifyNewComment(postAuthorUid,notification);
    } 
    catch (error) {
      
    }
   
    
  }
  handleFileInput(event: any ) {
    const file = event.target.files[0];
   
    const reader = new FileReader();
    
    reader.readAsText(file);

    reader.onload = (e: any) => {
      console.log('onload event triggered!');
      const div = document.createElement('div');
  
      div.classList.add('text-file-container');
      
      div.innerHTML = reader.result as string;
      const s:any=reader.result;
       console.log(s);
      this.textInputs.toArray()[this.currentCommentIndex].nativeElement.appendChild(div);
     
    };
   
    
  }
  
  toggleComment(index: number,postId:String) {
    console.log(index)
    
      this.isHidden[index] = !this.isHidden[index];
      this.currentCommentIndex=index;

      
   

      if(this.isHidden[index]==false)
        this.featureFacade.fetchComments(postId).then((x)=>{
          console.log(x)
          this.commentList.set(postId,x)
          const commentList= this.commentList.get(postId.toString());

         
        });
      
     
          
    }
 
  increaseLike(postId:any){
    console.log("liked")
    this.featureFacade.increaseLike(postId);
  }
  onErrorImageUrl(target: any, displayName: any) {
    const api = `https://ui-avatars.com/api/?name=${displayName}&background=0D8ABC&color=fff&size=128&rounded=true&bold=true&font-size=0.5';`
    target.src = api;
  }
 
  handleImageUpload(image: any) {
    const file: File = image.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.createCustomImage(reader.result as any);
    };
  }


  createCustomImage(base64: string) {
    const div = document.createElement('div');
    div.classList.add('tweet-image-container');
    div.innerHTML = `<br><img src="${base64}" alt="">`;
    this.textInputs.toArray()[this.currentCommentIndex].nativeElement.appendChild(div);
  }


}
