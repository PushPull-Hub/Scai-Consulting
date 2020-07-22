import { Injectable } from '@angular/core';

import { UserServices } from './user.service';
import { FriendsService } from './friends.service';

import { Conversation } from '../models/Conversation.model';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  messages: Conversation[] = JSON.parse(localStorage.getItem('Messages')) || [];

  constructor(
    private userService: UserServices,
    private friendsService: FriendsService
  ) {}

  getConversation(userId: string, friendId: string): Conversation {
    const stConversationId = `${userId}${friendId}`;
    const ndConversationId = `${friendId}${userId}`;
    return this.messages.find(
      (conversation) =>
        conversation.id === stConversationId ||
        conversation.id === ndConversationId
    );
  }

  // sendMessage(senderId: string, recieverId: string) {

  // }
}
