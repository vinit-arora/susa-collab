import { Component, OnInit } from '@angular/core';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { environment } from "../../../../environments/environment";
import { FeatureFacadeService } from '../../services/feature-facade.service';
import { UserProfile } from 'src/app/core/models/user-profile.model';
 
@Component({
  selector: 'twitter-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  title = 'af-notification';
  message:any = null;
  profile!:Partial<UserProfile>;
  notificationList!:any[];
  constructor(private featureFacade: FeatureFacadeService) {}
  ngOnInit(): void {
    this.featureFacade.getUserProfile().forEach((x)=>{
    this.profile=x;
    this.getNotifications();
    
     })
  }
  getNotifications() {
    this.featureFacade.getNotifications(this.profile.uid).then((x)=>{
       this.notificationList=x;
      console.log(this.notificationList);
  
     });
   
  }
   

}
