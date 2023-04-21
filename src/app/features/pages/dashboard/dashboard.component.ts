import { FeatureFacadeService } from '../../services/feature-facade.service';
import { Component, OnInit } from '@angular/core';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { environment } from "../../../../environments/environment";

@Component({
  selector: 'twitter-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  userInfo$ = this.featureFacade.getFirebaseUserInfo();
  userProfile$ = this.featureFacade.getUserProfile();
  postPost$ = this.featureFacade.getAllPosts();
  constructor(private featureFacade: FeatureFacadeService) {
    featureFacade.fetchAllPosts();
    console.log("fetched all tweets");
  }

  ngOnInit(): void {
    
  }
   
  subscribeForEvents() {
    const messaging = getMessaging();
    getToken(messaging, 
     { vapidKey: environment.firebase.vapidKey}).then(
       (currentToken) => {
         if (currentToken) {
           console.log("Hurraaa!!! we got the token.....");
           console.log(currentToken);
         } else {
           console.log('No registration token available. Request permission to generate one.');
         }
     }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
    });
  }
}
