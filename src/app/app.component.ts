import { CoreFacadeService } from './core/services/core-facade.service';
import { Component } from '@angular/core';
import { getMessaging, getToken, onMessage } from "firebase/messaging";

@Component({
  selector: 'twitter-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  currentAuthInfo$ = this._coreFacadeService.getCurrentUserInfo();

  constructor(private _coreFacadeService: CoreFacadeService) {
    this._coreFacadeService.getUserAuthInfo();
  }
}
