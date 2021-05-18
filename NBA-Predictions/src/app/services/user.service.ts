import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../modules/user';
import { LoginResponse } from '../modules/LoginResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  APIURL = "https://localhost:5001/";
  username: string;

  constructor(private http: HttpClient) { }

  registerUser(credentials: User): Promise<boolean> {
    this.username = credentials.username;
    return this.http.post<boolean>(this.APIURL + "Register", credentials).toPromise();
  }

  loginUser(credentials: User): Promise<LoginResponse> {
    this.username = credentials.username;
    return this.http.post<LoginResponse>(this.APIURL + "Login", credentials).toPromise();
  }
}
