import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Team } from '../modules/team';



@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  token = localStorage.getItem('token');
  // APIURL = "https://localhost:5001/Teams/";
  APIURL = "http://awseb-AWSEB-JC50TYJC3NMV-2042437434.us-east-1.elb.amazonaws.com/"
  // APIURL: string = 'http://awseb-AWSEB-1BZF9L6WNGS3Q-1337525334.us-east-1.elb.amazonaws.com/api/';

  constructor(private http: HttpClient) { }

  // Create a new team for a user
  CreateTeam() {

  }

  // Gets all teams for a user
  GetAllTeams(token): Promise<Team[]> {
    return this.http.post<Team[]>(this.APIURL + "getteams", token).toPromise();
  }

  // Updates a users specific team 
  // Requires sending the players keys for all the players of the newly udated team.
  // Uses api/PlayerSelection
  UpdateTeam() {

  }
}
