import { Injectable } from '@angular/core';
import { ChatMessage } from '../models/chat-message.model';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  user: any;
  chatMessages: AngularFireList<ChatMessage>;
  chatMessage: ChatMessage;
  userName: Observable<string>;

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) {
    this.afAuth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null) {
        this.user = auth;
      }
    });
  }

  sendMessage(msg: string) {
    const timeStamp = this.getTimeStamp();
    // const email = this.user.email;
    this.chatMessages = this.getMessages();
    this.chatMessages.push({
      message: msg,
      timeSent: timeStamp,
      userName: "test-user",
      email: "test@mail.com"
    });

    console.log('called sendMessage()!');
  }

  getMessages(): AngularFireList<ChatMessage> {
    return this.db.list('messages', ref => ref.limitToLast(25).orderByKey());
  }

  getTimeStamp() {
    const now = new Date();

    const date = now.getUTCFullYear() + '/' +
      (now.getUTCMonth() + 1) + '/' +
      now.getUTCDate();

    const time = now.getUTCHours() + ':' +
      now.getUTCMinutes() + ':' +
      now.getUTCSeconds();

    return (date + ' ' + time);
  }
}
