import { PostComment } from './PostComment.model';
import { PostLike } from './PostLike.model';

export class Post extends Object {
  id: number;
  created_time: string;
  description: string;
  objectId: any;
  place: string;
  canComment: number;
  canShare: number;
  pubblico: number;
  userId: number;
  comments: PostComment[];
  likersIds: PostLike[];
  imageUrl: string;
}
