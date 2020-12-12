import { MiniProfile } from './MiniProfile.model';
import { Message } from './Message.model';

export class ChatDTO extends Object {
  id: number;
  myId: number;
  secondUser: MiniProfile;
  isLastMessageSeen: SeenStatus;
  lastMessage: Message;
  messages: Message[];
}

enum SeenStatus {
  NotSeen = 0,
  Seen = 1,
}
