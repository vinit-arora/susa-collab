import { UserProfile } from '../../../core/models/user-profile.model';
import { Component, OnInit,ElementRef,ViewChild, Input } from '@angular/core';
import { FeatureFacadeService } from '../../services/feature-facade.service';
import { Message } from '../../models/message.model';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faImages } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
@Component({
  selector: 'twitter-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  @ViewChild('textInput') textInput!: ElementRef;
  @ViewChild('textContainer') textContainer!: ElementRef;
  
  faPicture: IconDefinition = faImages;
  myChats:any;
  channelName:any;
  textArea: string = "";
  profile: any;
  joinButtonClicked!:boolean;
  buttonText: string[] = [];
  channelList:Map<string,any>=new Map();
  fileToUpload: File | null = null;
  messages:Observable<any[]>=new Observable;
  currentChannelId:string=""
  constructor(private featureFacade: FeatureFacadeService) { }
  
  ngOnInit(): void {
   this.getAllChannels();
   
     
   for( let i=0;i<10;i++){
     // localStorage.setItem('button+{i}', 'Join');
    
    if (!localStorage.getItem('button'+i))  localStorage.setItem('button'+i, 'Join');
      this.buttonText[i]=localStorage.getItem('button'+i) || 'Join';
      console.log(localStorage.getItem('button'+i))
   }
   this.featureFacade.getUserProfile().forEach((x)=>{
    this.profile=x;
    
   })
   console.log(this.profile)
  }
  getAllChannels(){
   this.featureFacade.fetchAllChannels().then((x)=>{
     
    console.log("channels: " );
    this.channelList=x;
    console.log(this.channelList);
    
   });
  
  }
  selectChannel(channelId:any){
    console.log("fetching messages from: "+channelId);
    this.currentChannelId=channelId;
    // this.messages.
    this.featureFacade.fetchMessages(channelId).then((x)=>{
       this.messages=x;
    })
    console.log(this.messages)
  }
  textInputHandler($event: any) {
    this.textArea = $event.target.textContent;
   
    
  }
  followChannel(channelName:any,i:number){
     
    this.buttonText[i]="Requested"
    localStorage.setItem('button'+i, "Requested")
    this.featureFacade.joinChannel(channelName,this.profile.email);
  }
  
  sendMessage(){

    const messageContent = this.textContainer.nativeElement.innerHTML;
    const message: Partial<Message> = {
                                     content:messageContent,
                                     createdAt: new Date(),
                                      author:{
                                        name:this.profile.displayName,
                                        email:this.profile.email,
                                      }
                                     
                                    }

 
    this.textInput.nativeElement.innerHTML = "";
    this.textArea = "";
    console.log("Sending to"+ this.currentChannelId)

    this.featureFacade.sendMessage(this.currentChannelId,message);
    
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
  this.textInput.nativeElement.appendChild(div);
}


}
 

