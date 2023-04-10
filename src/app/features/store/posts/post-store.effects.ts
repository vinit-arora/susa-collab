
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as PostsAction from './post-store.actions';
import { switchMap, map, catchError, of } from 'rxjs';
import { FirebasePostsService } from '../../services/firebase-tweets.service';
 
import { Post } from '../../models/post.model';

@Injectable()
export class PostsStoreEffect {

  fetchAllPosts$ = createEffect((): any => this.actions$.pipe(
    ofType(PostsAction.fetchAllPosts),
    switchMap(() => {
      return this.firebasePostsService.getAllPosts();
    }),
    map(posts => {
      const postsData = posts.map((post: Post) => {
        const newPostObject = {
          ...post,
          post: decodeURIComponent(post.content),
          createdAt: post.createdAt.toDate()
        }
        return newPostObject;
      });
      return PostsAction.fetchAllPostsSuccess({ data: postsData })
    }),
    catchError(error => of(PostsAction.fetchAllPostsError({ error })))
  ));


  constructor(private actions$: Actions,
    private firebasePostsService: FirebasePostsService) { }
}
