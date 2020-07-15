export class Post extends Object {
  userId: number;
  created_time: string;
  text: string;
  description: string;
  comments: string[];
  likes: number;
  image: [];
  can_reply: boolean;
  can_share: boolean;
  is_hidden: boolean;
  location: string;
}
