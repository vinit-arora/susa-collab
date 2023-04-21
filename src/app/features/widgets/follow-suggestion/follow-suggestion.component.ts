import { Component, OnInit, Input } from '@angular/core';
import { FeatureFacadeService } from '../../services/feature-facade.service';
import { UserProfile } from '../../../core/models/user-profile.model';
 

@Component({
  selector: 'twitter-follow-suggestion',
  templateUrl: './follow-suggestion.component.html',
  styleUrls: ['./follow-suggestion.component.scss']
})
export class FollowSuggestionComponent implements OnInit {
  @Input() profile!: Partial<UserProfile>;
  followSuggestionList:any;
  constructor(private featureFacade: FeatureFacadeService) {
   
   }

  ngOnInit(): void {
  
   this.featureFacade.fetchAllProfiles().then((x)=>{
    // this.followSuggestionList=this.profile.following ;
    console.log("profile data for follow suggestion");
    this.followSuggestionList=x;
    })
    
   
  }
  followUser(id:string){
    const x=this.profile.uid!;
    // if(!x) x="";
    this.featureFacade.followUser(x,id);
  }

}
