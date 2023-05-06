import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {io} from 'socket.io-client'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  private socket: any;
  username: string = '';
  password: string = '';
  nickname: string = '';
  servermessage: string = '';
 
  constructor(private router: Router) {
    this.socket = io('http://localhost:8080');
  }

  register(username: string, password:string, nickname:string) {

    if (!username || !password  || !nickname) {
      return;
    }else{
      this.socket.emit('register', {username, password, nickname} );
    }

    this.socket.on('registrationSuccess', () =>{
      this.servermessage = 'Registered Succesfully';
    })
    this.socket.on('registrationFailure', () =>{
      this.servermessage = 'Username or nickname already exists';
    })
  }
}