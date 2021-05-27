import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { Player } from '../modules/player';
import { Header } from '../modules/header';
import { PlayerEnvelope } from '../modules/playerEnvelope';
import { GetPlayersFromTeamResponse } from '../modules/GetPlayersFromTeamResponse';
import { HeadersResponse } from '../modules/headersResponse';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  APIURL = "http://awseb-AWSEB-NWW3CW9O9SCF-103843184.us-east-1.elb.amazonaws.com/Player/";

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
    let body = {
      "teamName": teamName,
      "sortString": "FIRSTNAME",
      "sortType": "ASC"
    }
    return this.http.post<GetPlayersFromTeamResponse>(this.APIURL + "getPlayersFromTeam", body).toPromise();
  }

  // Used to get headers
  // Could have been handled in pervious functions 
  GetPlayerHeaders(): Promise<HeadersResponse> {
    return this.http.get<HeadersResponse>(this.APIURL + "headers").toPromise();
  }

}
