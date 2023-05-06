import { Component } from '@angular/core';
import {io} from 'socket.io-client' 
 
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})

export class ChatComponent {
  private socket: any;
  messages: string[] = [];
  newMessage: string = '';
  nickname: string = ''; // Add this property for the user's nickname

  constructor() {
    this.socket = io('http://localhost:8080');
    this.socket.on('message', (data: string) => {
      this.messages.push(data);
    });

    // Retrieve the user's nickname from local storage or login component (modify as needed)
    this.nickname = localStorage.getItem('nickname') || ''; 
  }

  sendMessage() {
    if (this.newMessage) {
      this.socket.emit('message', this.nickname + ': ' + this.newMessage);
      this.newMessage = '';
    }
  }
}