import { PostComment } from './PostComment.model';

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
  likerIds: { id: number; likersId: number }[];
}
