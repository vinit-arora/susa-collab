import { Component, OnInit } from '@angular/core';
import { FeatureFacadeService } from '../../services/feature-facade.service';
 

@Component({
  selector: 'twitter-follow-suggestion',
  templateUrl: './follow-suggestion.component.html',
  styleUrls: ['./follow-suggestion.component.scss']
})
export class FollowSuggestionComponent implements OnInit {

  followSuggestionList:any;
  constructor(private featureFacade: FeatureFacadeService) {
   
   }

  ngOnInit(): void {
    console.log("profile data for follow suggestion");
   this.featureFacade.fetchAllProfiles().then((x)=>{this.followSuggestionList=x ;console.log(x)});

  }

}
