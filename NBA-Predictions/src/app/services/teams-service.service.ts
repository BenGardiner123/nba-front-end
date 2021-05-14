import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Team } from '../modules/team';



@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  token = localStorage.getItem('token');
  APIURL = "https://localhost:5001/Teams/";
  // APIURL = "http://awseb-AWSEB-JC50TYJC3NMV-2042437434.us-east-1.elb.amazonaws.com/"
  // APIURL: string = 'http://awseb-AWSEB-1BZF9L6WNGS3Q-1337525334.us-east-1.elb.amazonaws.com/api/';

  constructor(private http: HttpClient) { }

  // Create a new team for a user
  CreateTeam(teamName: string): Promise<boolean> {
    // Send a team name and expect a boolean depending on the success of the http
    return this.http.post<boolean>(this.APIURL + "addteam", {
      "token": this.token,
      "teamName": teamName
    }).toPromise();
  }

  // Gets all teams for a user
  GetAllTeams(token): Promise<Team[]> {
    return this.http.post<Team[]>(this.APIURL + "getteams", token).toPromise();
  }

  DeleteTeam(teamName: string) {
    this.http.put(this.APIURL + "deleteteam", {
      "token": this.token,
      "teamName": teamName
    }).toPromise();
  }

  // Takes in a team and toggles its favourites value
  ToggleFavourite(team: Team) {
    this.http.put(this.APIURL + "deleteteam", {
      "token": this.token,
      "teamName": team.teamName,
      "isFav": team.isFav
    }).toPromise();
  }
}
