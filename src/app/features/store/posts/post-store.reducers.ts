import { CommonConstants } from '../../../shared/constants/common-constants';
import { createReducer, on } from '@ngrx/store';
import * as PostsAction from './post-store.actions';
import { Post } from '../../models/post.model';


const httpDataStatus = CommonConstants.HTTP_DATA_STATUS;

export const initialPostState: { posts: Post[]; dataStatus: string } = {
  posts: [],
  dataStatus: httpDataStatus.LOADING
}

export const reducer = createReducer(
  initialPostState,

  on(PostsAction.fetchAllPosts, (state) => ({
    ...initialPostState
  })),

  on(PostsAction.fetchAllPostsSuccess, (state, { data }) => ({
    ...state,
    posts: data,
    dataStatus: httpDataStatus.SUCCESS
  })),

  on(PostsAction.fetchAllPostsError, (state, { error }) => ({
    ...state,
    posts: [],
    error,
    dataStatus: httpDataStatus.ERROR
  })),

)
