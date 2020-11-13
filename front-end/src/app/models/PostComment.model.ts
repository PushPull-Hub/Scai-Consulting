import { Post } from './Post.model';
import { Profile } from './Profile.model';

export class PostComment extends Object {
  id: number;
  createdTime: string;
  comment: string;
  post: Post;
  profile: Profile;
}
