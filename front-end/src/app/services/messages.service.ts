import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

import { ChatDTO } from '../models/ChatDTO.model';
import { Conversation } from '../models/Conversation.model';
import { Message } from '../models/Message.model';
import { MessageDTO } from '../models/MessageDTO.model';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  messages: Conversation[];

  constructor(private http: HttpClient) {}

  getMyChats(): Observable<ChatDTO[]> {
    return this.http.get<ChatDTO[]>(environment.rootUrl + '/api/my-chats');
  }

  getMessagesByConversationId(conversationId: number): Observable<Message[]> {
    return this.http.post<Message[]>(
      environment.rootUrl + '/api/conversation/messages',
      conversationId
    );
  }

  getChatByItsId(chatId: number): Observable<ChatDTO> {
    return this.http.get<ChatDTO>(environment.rootUrl + 'api/chat/' + chatId);
  }

  getChatByUsersIds(friendId: number): Observable<ChatDTO> {
    return this.http.post<ChatDTO>(
      environment.rootUrl + '/api/conversation',
      friendId
    );
  }

  createConversation(friendId: number): Observable<ChatDTO> {
    return this.http.post<ChatDTO>(
      environment.rootUrl + '/api/chats',
      friendId
    );
  }

  sendMessage(message: MessageDTO) {
    return this.http.post<Message>(
      environment.rootUrl + '/api/messages/message',
      message
    );
  }

  setConversationLastMessageToSeen(
    conversationId: number
  ): Observable<Conversation> {
    return this.http.post<Conversation>(
      environment.rootUrl + '/api/see-last-message',
      conversationId
    );
  }
}
