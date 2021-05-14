import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  token = localStorage.getItem('token');
  // APIURL = "https://localhost:5001/";
  APIURL = "http://awseb-AWSEB-JC50TYJC3NMV-2042437434.us-east-1.elb.amazonaws.com/"
  // APIURL: string = 'http://awseb-AWSEB-1BZF9L6WNGS3Q-1337525334.us-east-1.elb.amazonaws.com/api/';

  // Gets all players for a set criteria
  // Used on ManagePlayers
  GetPlayers() {
    return;
  }

  // Gets all players for a set teamName
  // Used on Teamsummary
  GetPlayersFromTeam() {
    return;
  }

  // Used to get headers
  // Could have been handled in pervious functions 
  GetPlayerHeaders() {
    return;
  }
}
