import { Post } from './Post.model';

export class User {
  username: string;
  password: string;
  email: string;
  firstname: string;
  secondname: string;
  id: string;
  posts: Post;
}
