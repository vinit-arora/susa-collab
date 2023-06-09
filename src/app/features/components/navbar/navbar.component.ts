import { group } from '@angular/animations';
import { FeatureFacadeService } from '../../services/feature-facade.service';
import { Component, OnInit } from '@angular/core';
import {  IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { faBell, faCaretDown, faEnvelope, faHashtag, faHome, faUser , faThermometer0, faPeopleGroup} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'twitter-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  faTwitter: IconDefinition =  faThermometer0;
  faHome: IconDefinition = faHome;
  faExplore: IconDefinition = faHashtag;
  faChannel: IconDefinition = faPeopleGroup;
  faNotification: IconDefinition = faBell;
  faDropdown: IconDefinition = faCaretDown;
  faAccount: IconDefinition = faUser;

  userProfile$ = this.featureFacade.getUserProfile();

  constructor(private featureFacade: FeatureFacadeService) { }

  ngOnInit(): void {
  }

  logoutUser() {
    this.featureFacade.logoutUser();
  }

  onErrorImageUrl(target: any, displayName: any) {
    const api = `https://ui-avatars.com/api/?name=${displayName}&background=0D8ABC&color=fff&size=128&rounded=true&bold=true&font-size=0.5';`
    target.src = api;
  }

}
