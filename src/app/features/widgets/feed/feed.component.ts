import { UserProfile } from '../../../core/models/user-profile.model';
import { Component, Input, OnChanges, OnInit, SimpleChanges,ViewChild, ElementRef, AfterViewChecked} from '@angular/core';
import { IconDefinition, faHeart, faRetweet, faShareSquare, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { Post } from '../../models/post.model';
import { Comment } from '../../models/comment.model';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import {  faImages, faLaughSquint, faPhotoVideo, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { FeatureFacadeService } from '../../services/feature-facade.service';
 
 
import 'firebase/compat/database';
 
 



 

@Component({
  selector: 'twitter-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnChanges,OnInit{

  @ViewChild('textInput') textInput!: ElementRef;
  @ViewChild('textContainer') textContainer!: ElementRef;
  @Input() feedPosts: Post[] = [];
  @Input() profile!: Partial<UserProfile>;

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



   constructor(private featureFacade: FeatureFacadeService) { }

   ngOnInit(){
     
    console.log("rishu");
    console.log(this.profile);
     
   }
   

   
  ngOnChanges(): void {

    console.log('feedPosts', this.feedPosts)
    this.isHidden=Array(this.feedPosts.length).fill(true);
    
  }
  

  textInputHandler($event: any) {
    this.textArea = $event.target.textContent;
    this.handleUrlMatches();
  }
  
  handleUrlMatches() {
    const urlMatches = this.textArea.match(/\b(http|https)?:\/\/\S+/gi) || [];
    urlMatches.forEach(url => {
      this.textInput.nativeElement.innerHTML = this.textInput.nativeElement.innerHTML.replace(url, ``);
      this.url_matches.push(url);
    });
  }
  
  handleComment(postId:String) {
    console.log(this.profile)
    const comment: Partial<Comment> = {
                                     content:this.comment,
                                     date: (new Date()).toString(),
                                      author:{
                                        name: this.profile.displayName || "",
                                        email:""}
                                     
                                    }

 
    
    
    console.log(postId+":postId");

    this.featureFacade.postComment(comment,postId);
     
  }
  toggleComment(index: number) {
      this.isHidden[index] = !this.isHidden[index];
    }
 
  increaseLike(postId:any){
    console.log("liked")
    this.featureFacade.increaseLike(postId);
  }
  onErrorImageUrl(target: any, displayName: any) {
    const api = `https://ui-avatars.com/api/?name=${displayName}&background=0D8ABC&color=fff&size=128&rounded=true&bold=true&font-size=0.5';`
    target.src = api;
  }
 


 

}
