import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient) { }

  login() {
    const credentials = {
      username: this.username,
      password: this.password
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    this.http.post<any>('http://localhost:8080/login', credentials, httpOptions)
      .subscribe(
        response => {

          console.log('Login successful');
        },
        error => {

          console.log('Login failed', error);
        }
      );
  }
}
