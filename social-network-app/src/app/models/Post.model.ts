export class Post extends Object {
  userId: string;
  postId: string;
  created_time: any;
  text: string;
  description: string;
  comments: [{ commenterId: string; comment: string }];
  likes: number;
  image: [];
  can_reply: boolean;
  can_share: boolean;
  is_hidden: boolean;
  location: string;
}
