import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as PostReducer from './posts/post-store.reducers';
import { PostsStoreEffect } from './posts/post-store.effects';
import { FEATURE_KEY } from '../../shared/constants/store.constants';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

const featureKey = FEATURE_KEY.Feature;

const reducers = {
  feed: PostReducer.reducer
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EffectsModule.forFeature([PostsStoreEffect]),
    StoreModule.forFeature(featureKey, reducers)
  ]
})
export class FeatureStoreModule { }
