import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Team } from '../modules/team';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  currentTeam: string = '';
  token = localStorage.getItem('token');
  APIURL = "https://localhost:5001/Teams/";

  constructor(private http: HttpClient) { }

  // Create a new team for a user
  CreateTeam(teamName: string): Promise<boolean> {
    this.token = JSON.parse(localStorage.getItem('token'));

    // Send a team name and expect a boolean depending on the success of the http
    let request = {
      "token": this.token,
      "teamName": teamName
    }
    return this.http.post<boolean>(this.APIURL + "addteam", request).toPromise();
  }

  // Gets all teams for a user
  GetAllTeams(): Promise<Team[]> {
    this.token = JSON.parse(localStorage.getItem('token'));
    return this.http.post<Team[]>(this.APIURL + "getteams", {
      "token": this.token
    }).toPromise();
  }

  DeleteTeam(teamName: string) {
    this.token = JSON.parse(localStorage.getItem('token'));
    let body = {
      "token": this.token,
      "teamName": teamName
    }
    this.http.put(this.APIURL + "deleteteam", body).toPromise();
  }

  // Takes in a team and toggles its favourites value on the backend
  ToggleFavourite(team: Team) {
    this.token = JSON.parse(localStorage.getItem('token'));

    this.http.put(this.APIURL + "setfavourites", {
      "token": this.token,
      "teamName": team.teamName,
      "isFav": team.isFav
    }).toPromise();
  }

  UpdateTeam(teamName: string, playerKeys: number[]) {
    this.token = JSON.parse(localStorage.getItem('token'));
    this.http.post("https://localhost:5001/PlayerSelection/UpdatePlayerSelection", {
      "token": this.token,
      "teamName": teamName,
      // FIXME
      "userId": 0,
      "playerKeys": playerKeys
    }).toPromise();
  }
}
