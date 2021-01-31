import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private url = 'http://localhost:3000';  
  private socket;
  
  constructor() { }

  getNotification(): Observable<Notification> {
    let observable = new Observable<Notification>(observer => {
      this.socket = io(this.url);
      this.socket.on('new-notification', (data) => {
        let notification: Notification = data.fullDocument;
        observer.next(notification);    
      });
      return () => {
        this.socket.disconnect();
      };  
    })     
    return observable;
  }  
}
