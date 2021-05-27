import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../modules/user';
import { LoginResponse } from '../modules/LoginResponse';
import { RegisterResponseModel } from '../modules/registerResponseModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  APIURL = "http://awseb-AWSEB-NWW3CW9O9SCF-103843184.us-east-1.elb.amazonaws.com/User/"

  constructor(private http: HttpClient) { }

  registerUser(credentials: User): Promise<RegisterResponseModel> {
    return this.http.post<RegisterResponseModel>(this.APIURL + "Register", credentials).toPromise();
  }

  loginUser(credentials: User): Promise<LoginResponse> {
    return this.http.post<LoginResponse>(this.APIURL + "Login", credentials).toPromise();
  }
}
