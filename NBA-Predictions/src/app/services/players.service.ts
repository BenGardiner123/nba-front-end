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
  // my 2 cents is the APIURL could be refactored to
  // private apiURL = environment.apiURL + '/Players' where each service has the "/endpointName" to differentiate
  // and then when we change the production url we only have to do it once in the environment variables.
  

  APIURL = "https://localhost:5001/Players/";

  constructor(private http: HttpClient) { }

  // TODO Error handling 

  // Gets all players for a set criteria
  // Used on ManagePlayers
  GetPlayers(pageNum: number, pageSizing: number, searchstring: string, sortstring: string, sortorder: string): Promise<PlayerEnvelope> {
    return this.http.get<PlayerEnvelope>(this.APIURL + "SearchPlayer?searchstring=" + searchstring + "&PageNumber=" + pageNum + "&PageSize=" + pageSizing + "&SortString=" + sortstring + "&SortOrder=" + sortorder).toPromise();
  }

  // Gets all players for a set teamName
  // Used on Teamsummary
  // Return Make model for GetPlayersFromTeamReposonse
  GetPlayersFromTeam(teamName: string): Promise<GetPlayersFromTeamResponse> {
    let request = {
      "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MjExNzY1NzksIlVzZXIiOiIxIn0.HRmuKlr8-BPtWGLbZ8o5vHpL77YAdPLOH12uIwFYiHE",
      "teamName": "bob",
      "sortString": "FIRSTNAME",
      "sortType": "ASC"
    }
    return this.http.post<GetPlayersFromTeamResponse>(this.APIURL + "getPlayersFromTeam", request).toPromise();
  }

  // Used to get headers
  // Could have been handled in pervious functions 
  GetPlayerHeaders(): Promise<Header[]> {
    return this.http.get<Header[]>(this.APIURL + "headers").toPromise();
  }
}
