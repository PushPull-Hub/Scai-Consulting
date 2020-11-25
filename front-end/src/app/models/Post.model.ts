import { PostComment } from './PostComment.model';

export class Post extends Object {
  id: number;
  createdTime: string;
  description: string;
  objectId: any;
  place: string;
  canComment: number;
  canShare: number;
  ispublic: number;
  userId: number;
  comments: PostComment[];
  likerIds: { id: number; likersId: number }[];
}
