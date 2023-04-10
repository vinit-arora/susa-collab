
import { createAction, props } from '@ngrx/store';

export const fetchAllPosts = createAction(
  '[FEATURE+TWEETS] Fetch All Posts For Feed',
);
export const fetchAllPostsSuccess = createAction(
  '[FEATURE+TWEETS] Fetch All Posts For Feed Success',
  props<{ data: any }>()
);
export const fetchAllPostsError = createAction(
  '[FEATURE+TWEETS] Fetch All Posts For Feed Error',
  props<{ error: any }>()
);
