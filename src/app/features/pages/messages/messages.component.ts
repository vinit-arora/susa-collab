import { Component, OnInit } from '@angular/core';
import { FeatureFacadeService } from '../../services/feature-facade.service';
@Component({
  selector: 'twitter-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  constructor(private featureFacade: FeatureFacadeService) { }
  myChats:any;
  channelName:any;
  channelsList:any[]=[];
  messages:any[]=[];
  ngOnInit(): void {
   this.getAllChannels();
  }
  getAllChannels(){
   this.featureFacade.fetchAllChannels().then((x)=>{
    this.channelsList=x;
    console.log("channels" );
    console.log(this.channelsList);
   });
  
  }
  selectChannel(channel:any){
    // console.log("fetching messages"+channel);
    this.messages=[];
    this.featureFacade.fetchMessages(channel.channelId).then((x)=>{
       this.messages=x;
    })
    console.log(this.messages)
  }
}
