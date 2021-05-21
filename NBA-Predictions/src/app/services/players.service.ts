import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { Player } from '../modules/player';
import { Header } from '../modules/header';
import { PlayerEnvelope } from '../modules/playerEnvelope';
import { GetPlayersFromTeamResponse } from '../modules/GetPlayersFromTeamResponse';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  token = localStorage.getItem('token');

  APIURL = "https://localhost:5001/Players/";

  constructor(private http: HttpClient) { }

  // TODO Error handling 

  // Gets all players for a set criteria
  // Used on ManagePlayers
  GetPlayers(pageNum: number, pageSizing: number, searchstring: string, sortstring: string, sortorder: string): Promise<PlayerEnvelope> {
    this.token = JSON.parse(localStorage.getItem('token'));
    return this.http.get<PlayerEnvelope>(this.APIURL + "SearchPlayer?searchstring=" + searchstring + "&PageNumber=" + pageNum + "&PageSize=" + pageSizing + "&SortString=" + sortstring + "&SortOrder=" + sortorder).toPromise();
  }

  // Gets all players for a set teamName
  // Used on Teamsummary
  // Return Make model for GetPlayersFromTeamReposonse
  GetPlayersFromTeam(teamName: string): Promise<GetPlayersFromTeamResponse> {
    this.token = JSON.parse(localStorage.getItem('token'));
    let body = {
      "token": this.token,
      "teamName": teamName,
      "sortString": "FIRSTNAME",
      "sortType": "ASC"
    }
    return this.http.post<GetPlayersFromTeamResponse>(this.APIURL + "getPlayersFromTeam", body).toPromise();
  }

  // Used to get headers
  // Could have been handled in pervious functions 
  GetPlayerHeaders(): Promise<Header[]> {
    this.token = JSON.parse(localStorage.getItem('token'));
    return this.http.get<Header[]>(this.APIURL + "headers").toPromise();
  }

}
