import { Injectable } from '@angular/core';

import { UserServices } from './user.service';
import { FriendsService } from './friends.service';

import { Conversation } from '../models/Conversation.model';
import { Message } from '../models/Message.model';

import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  messages: Conversation[] = JSON.parse(localStorage.getItem('Messages')) || [];

  constructor(
    private userService: UserServices,
    private friendsService: FriendsService
  ) {}

  getMessages(): Conversation[] {
    return (this.messages = JSON.parse(localStorage.getItem('Messages')) || []);
  }

  getConversation(userId: string, friendId: string): Conversation {
    const stConversationId = `${userId}${friendId}`;
    const ndConversationId = `${friendId}${userId}`;
    return this.messages.find(
      (conversation) =>
        conversation.id === stConversationId ||
        conversation.id === ndConversationId
    );
  }

  updateConversationMessagesArray(id: string, messagesArray: Message[]) {
    const conversation: Conversation = this.messages.find(
      (conversation) => conversation.id === id
    );
    conversation.messages = messagesArray;
    console.log(conversation);
    const IndexOfConversation = this.messages.map((x) => x.id).indexOf(id);
    this.messages.splice(IndexOfConversation, 1, conversation);
    localStorage.setItem('Messages', JSON.stringify(this.messages));
  }

  sendMessage(sender: string, reciever: string, text: string) {
    const conversation: Conversation = this.getConversation(sender, reciever);
    console.log(conversation);
    const messages = conversation.messages;
    const message = new Message();
    message.id = uuidv4();
    message.sender = sender;
    message.reciever = reciever;
    message.text = text;
    console.log(message);
    messages.push(message);

    this.updateConversationMessagesArray(conversation.id, messages);
  }
}
