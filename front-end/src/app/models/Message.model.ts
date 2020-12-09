export class Message extends Object {
  id: number;
  createdTime: string;
  sender: number;
  reciever: number;
  text: string;
  body: any;
  isSeen: boolean;
}
