import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { LoginResponse } from '../modules/LoginResponse';
import { environment } from 'src/environments/environment';
import { User } from '../modules/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private authURL = environment.authURL + '/User'

  constructor(private http: HttpClient) { }

  registerUser(credentials: User): Promise<boolean> {
    return this.http.post<boolean>(`${this.authURL}/register`, credentials).toPromise();
  }

  //create a userID in the NBA_db to go with the registration 
  createNbaUserId(userName: string): Promise<boolean> {
    return this.http.post<boolean>(`${this.authURL}/createId`, userName).toPromise();

  }

  loginUser(credentials: User): Promise<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.authURL}/Login`, credentials).toPromise();
  }
}
