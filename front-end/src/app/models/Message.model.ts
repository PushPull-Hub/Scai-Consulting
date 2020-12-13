export class Message extends Object {
  id: number;
  createdTime: string;
  senderId: number;
  receiverId: number;
  text: string;
  body: any;
  isSeen: boolean;
}
