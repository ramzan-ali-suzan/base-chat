import { Component, OnChanges, OnInit } from '@angular/core';
import { AngularFireList } from '@angular/fire/database';
import { ChatMessage } from '../models/chat-message.model';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, OnChanges {

  feed: any;

  constructor(private chat: ChatService) { }

  ngOnInit(): void {
    this.feed = this.chat.getMessages().valueChanges();
  }

  ngOnChanges() {
    this.feed = this.chat.getMessages();
  }

}
