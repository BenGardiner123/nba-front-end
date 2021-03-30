import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Team } from '../modules/team';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  Teams : Team[] ;

  constructor(private http: HttpClient) { }

  GetAllTeams(): string[] {
    // let request = this.http.get<Team[]>("http-Of-Deployed-API");
    // request.subscribe((response) =>{
    //   this.Teams = response;      
    // }, (error) => {
    //   alert("The API is down!");
    // });
    
    // Http GET/ get all teams 
    return null;
  }
}