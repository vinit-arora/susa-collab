import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessagesRoutingModule } from './messages-routing.module';
import { MessagesComponent } from './messages.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
 

@NgModule({
  declarations: [
    MessagesComponent
  ],
  imports: [
    CommonModule,
    MessagesRoutingModule,
    FontAwesomeModule
  ]
})
export class MessagesModule { }
