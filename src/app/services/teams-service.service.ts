import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Team } from '../modules/team';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  currentTeam: string = '';
  APIURL = "http://awseb-AWSEB-NWW3CW9O9SCF-103843184.us-east-1.elb.amazonaws.com/Team/"

  constructor(private http: HttpClient) { }

  // Create a new team for a user // working *********************
  CreateTeam(teamName: string): Promise<boolean> {
    // Send a team name and expect a boolean depending on the success of the http
    let requestBody = {
      "teamName": teamName
    }
    return this.http.post<boolean>(this.APIURL + "addteam", requestBody).toPromise();
  }

  // Gets all teams for a user
  GetAllTeams(): Promise<Team[]> {
    return this.http.get<Team[]>(this.APIURL + "getteams").toPromise();
  }

  // localhost:5000/Team/deleteteam?teamname=team1
  DeleteTeam(teamName: string) {
    let requestBody = {
      "teamName": teamName
    }
    this.http.put(this.APIURL + "deleteteam", requestBody).toPromise();
  }

  // Takes in a team and toggles its favourites value on the backend
  ToggleFavourite(team: Team) {
    let body = {
      "teamNames": team.teamName,
      "isFav": !team.isFav
    }
    this.http.put(this.APIURL + "setfavorites", body).toPromise(); 
  }

  UpdateTeam(teamName: string, playerKeys: number[]) {
    this.http.post("http://awseb-AWSEB-NWW3CW9O9SCF-103843184.us-east-1.elb.amazonaws.com/PlayerSelection/UpdatePlayerSelection", {
      "teamName": teamName,
      "playerKeys": playerKeys
    }).toPromise();
  }
}
