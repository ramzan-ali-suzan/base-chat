import { Component, Input, OnInit } from '@angular/core';
import { ChatMessage } from '../models/chat-message.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input() chatMessage: ChatMessage;
  userEmail: string;
  userName: string;
  messageContent: string;
  timeStamp: string;

  constructor() { }

  ngOnInit(chatMessage = this.chatMessage) {
     this.messageContent = chatMessage.message;
     this.timeStamp = chatMessage.timeSent;
     this.userEmail = chatMessage.email;
     this.userName = chatMessage.userName;
  }

}
