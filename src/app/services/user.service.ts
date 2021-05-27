import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../modules/user';
import { LoginResponse } from '../modules/LoginResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  APIURL = "http://dotnetauthentication-prod.us-east-1.elasticbeanstalk.com/";

  constructor(private http: HttpClient) { }

  registerUser(credentials: User): Promise<boolean> {
    return this.http.post<boolean>(this.APIURL + "register", credentials).toPromise();
  }

  loginUser(credentials: User): Promise<LoginResponse> {
    return this.http.post<LoginResponse>(this.APIURL + "Login", credentials).toPromise();
  }
}
