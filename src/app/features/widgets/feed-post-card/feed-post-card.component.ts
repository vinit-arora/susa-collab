import { UserProfile } from '../../../core/models/user-profile.model';
import { FeatureFacadeService } from '../../services/feature-facade.service';
import { Post } from '../../models/post.model';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { AfterViewChecked, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { IconDefinition, faImages, faLaughSquint, faPhotoVideo, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Token } from '@angular/compiler';

declare const microlink: any;
@Component({
  selector: 'twitter-feed-post-card',
  templateUrl: './feed-post-card.component.html',
  styleUrls: ['./feed-post-card.component.scss']
})
export class FeedPostCardComponent implements OnInit, AfterViewChecked {


  @ViewChild('textInput') textInput!: ElementRef;
  @ViewChild('textContainer') textContainer!: ElementRef;
  emojiToggle: boolean = false;

  @Input() profile!: Partial<UserProfile>;

  textArea: string = "";
  url_matches: any = [];
  faPicture: IconDefinition = faImages;
  faEmoji: IconDefinition = faLaughSquint;
  faGif: IconDefinition = faPhotoVideo;
  faSchedule: IconDefinition = faCalendarAlt;
  faClose: IconDefinition = faTimesCircle

  constructor(private featureFacade: FeatureFacadeService) { }

  ngOnInit(): void {
   
  }

  ngAfterViewChecked(): void {
    microlink('.link-preview');
  }

  textInputHandler($event: any) {
    this.textArea = $event.target.textContent;
    this.handleUrlMatches();
  }

  handleEmojiSelection($event: any) {
    this.textInput.nativeElement.innerHTML += $event.char;
    this.textArea = this.textInput.nativeElement.innerHTML;
  }

  handleImageUpload(image: any) {
    const file: File = image.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.createCustomImage(reader.result as any);
    };
  }

  handlePost() {
    
    const postText = this.textContainer.nativeElement.innerHTML;
    const post: Partial<Post> = {
      content:  postText,
      createdAt: new Date(),
      authorUid: this.profile.uid,
      authorName:this.profile.displayName,
      likes: 0,
      comments: 0,
      shares: 0,
    
      isRetweeted: false,
      isShared: false,
      
      isEdited: false,
      id:"unknown"
    }
    this.featureFacade.postPost(post);
    const x={message:"Hello"}
    // this.featureFacade.notifyNewPost(this.profile.followers|| [],x);
    this.textInput.nativeElement.innerHTML = "";
    this.textArea = "";
    this.url_matches = []
  }

  createCustomImage(base64: string) {
    const div = document.createElement('div');
    div.classList.add('tweet-image-container');
    div.innerHTML = `<br> <img src="${base64}" alt="">`;
    this.textInput.nativeElement.appendChild(div);
  }

  handleUrlMatches() {
    const urlMatches = this.textArea.match(/\b(http|https)?:\/\/\S+/gi) || [];
    urlMatches.forEach(url => {
      this.textInput.nativeElement.innerHTML = this.textInput.nativeElement.innerHTML.replace(url, ``);
      this.url_matches.push(url);
    });
  }

  removeAddedLink(ind: number) {
    this.url_matches.splice(ind, 1);
  }

  onErrorImageUrl(target: any, displayName: any) {
    const api = `https://ui-avatars.com/api/?name=${displayName}&background=0D8ABC&color=fff&size=128&rounded=true&bold=true&font-size=0.5';`
    target.src = api;
  }
}