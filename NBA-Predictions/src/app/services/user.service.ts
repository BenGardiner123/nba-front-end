import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../modules/user';
import { Observable } from 'rxjs';
import { Token } from '../modules/token';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  APIURL = "https://localhost:5001/";
  // APIURL: string = 'http://awseb-AWSEB-1BZF9L6WNGS3Q-1337525334.us-east-1.elb.amazonaws.com/api/';

  notExists = false;
  username: string;

  constructor(private http: HttpClient) { }

  registerUser(credentials: User): Promise<boolean> {
    this.username = credentials.username;
    return this.http.post<boolean>(this.APIURL + "register", credentials).toPromise();
  }

  loginUser(credentials: User) {
    this.username = credentials.username;
    return this.http.post<Token>(this.APIURL + "Login", credentials).toPromise();
  }
}
