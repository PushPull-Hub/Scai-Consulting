import { Injectable } from '@angular/core';

import { UserServices } from './user.service';
import { FriendsService } from './friends.service';

import { Conversation } from '../models/Conversation.model';
import { Message } from '../models/Message.model';

import { v4 as uuidv4 } from 'uuid';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  messages: Conversation[] = JSON.parse(localStorage.getItem('Messages')) || [];

  constructor(
    private userService: UserServices,
    private friendsService: FriendsService,
    private authService: AuthService
  ) {}

  getMessages(): Conversation[] {
    return (this.messages = JSON.parse(localStorage.getItem('Messages')) || []);
  }

  // getConversation(friendId: string): Conversation {
  //   const stConversationId = `${this.authService.getLoggedUserId()}${friendId}`;
  //   const ndConversationId = `${friendId}${this.authService.getLoggedUserId()}`;
  //   return this.messages.find(
  //     (conversation) =>
  //       conversation.id === stConversationId ||
  //       conversation.id === ndConversationId
  //   );
  // }

  // getUserConversations(): Conversation[] {
  //   return this.getMessages().filter((conversation) =>
  //     conversation.id.includes(this.authService.getLoggedUserId())
  //   );
  // }

  // getTheFriendId(conversationId: string) {
  //   return this.authService.getLoggedUserId()
  //     ? conversationId.replace(this.authService.getLoggedUserId(), '')
  //     : undefined;
  // }

  // getTheFriend(conversationId: string) {
  //   return this.userService.getUserVersion2(
  //     this.getTheFriendId(conversationId)
  //   );
  // }

  // updateConversationMessagesArray(id: string, messagesArray: Message[]) {
  //   const conversation: Conversation = this.messages.find(
  //     (conversation) => conversation.id === id
  //   );
  //   conversation.messages = messagesArray;
  //   const IndexOfConversation = this.messages.map((x) => x.id).indexOf(id);
  //   this.messages.splice(IndexOfConversation, 1, conversation);
  //   localStorage.setItem('Messages', JSON.stringify(this.messages));
  // }

  // setLastMessageToReaded (ConversationId:string) {
  //  this.getUserConversations.filter(conversation => conversation.id === ConversationId )

  // }

  updateMessage(
    conversationId: string,
    messageId: string,
    property: string,
    newValue: any
  ) {
    const conversation: Conversation = this.getMessages().find(
      (conversation) => conversation.id === conversationId
    );
    const message: Message = conversation.messages.find(
      (msg) => (msg.id = messageId)
    );
    message[`${property}`] = newValue;
    const IndexOfConversation = this.messages
      .map((conversation) => conversation.id)
      .indexOf(conversationId);
    this.messages.splice(IndexOfConversation, 1, conversation);
    localStorage.setItem('Messages', JSON.stringify(this.messages));
  }

  // sendMessage(reciever: string, text: string) {
  //   const conversation: Conversation = this.getConversation(reciever);
  //   const messages = conversation.messages;
  //   const message = new Message();
  //   message.id = uuidv4();
  //   // message.sender = this.authService.getLoggedUserId();
  //   message.reciever = reciever;
  //   message.text = text;
  //   message.is_readed = false;

  //   messages.push(message);

  //   // this.updateConversationMessagesArray(conversation.id, messages);
  // }
}
