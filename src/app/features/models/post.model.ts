import { Comment } from "./comment.model";

export interface Post {
  id:string,
  content: string;
  createdAt: any;
  authorUid: string;
  authorName:string
  likes: number;
  shares: number;
  isRetweeted: boolean;
  isShared: boolean;
  isEdited: boolean;
  comments:Comment[];// array of comments for the post
}
