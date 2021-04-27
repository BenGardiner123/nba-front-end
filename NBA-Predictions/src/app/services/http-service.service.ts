import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Team } from '../modules/team';
import { Player } from '../modules/player';

import { error } from '@angular/compiler/src/util';
import { PlayerEnvelope } from '../modules/playerEnvelope';
import { HeaderEnvelope } from '../modules/headerEnvelope';
import { PlayerSelections } from '../modules/playerSelections';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  teams: Team[];
  pages: number = 1;
  headers: string[];
  players: Player[] = [];

  constructor(private http: HttpClient) { }

  GetAllTeams(): Team[] {
    this.teams = [];
    let request = this.http.get<Team[]>("http://awseb-AWSEB-1BZF9L6WNGS3Q-1337525334.us-east-1.elb.amazonaws.com/api/Team");
    request.subscribe((response) => {
      response.forEach(element => {
        this.teams.push(element);
      });
    }, (error) => {
      alert("The API is down!");
    });
    return this.teams;
  }

  PlayerSearch(pageNum: number, pageSizing: number, searchstring: string, sortstring: string, sortorder: string): Player[] {
    this.players = [];
    localStorage.removeItem('playerSearchPages');
    let request = this.http.get<PlayerEnvelope>("http://awseb-AWSEB-1BZF9L6WNGS3Q-1337525334.us-east-1.elb.amazonaws.com/api/Player/SearchPlayer?searchstring=" + searchstring + "&PageNumber=" + pageNum + "&PageSize=" + pageSizing + "&SortString=" + sortstring + "&SortOrder=" + sortorder);
    request.subscribe((response) => {
      response.data.forEach(element => {
        this.players.push(element);
      });
      if(response.pages == 0){
        this.pages = 1;
      }
      else{
        this.pages = response.pages;
      }
      
      localStorage.setItem('playerSearchPages', JSON.stringify(this.pages));
      console.log(this.pages + " in playersearch");

    }, (error) => {
      alert("The API is down!");
    });

    return this.players;
  }


  ViewPlayers(pageNum: number, pageSizing: number, sortString: string, sortOrder: string): Player[] {
    this.players = [];
    let request = this.http.get<PlayerEnvelope>("http://awseb-AWSEB-1BZF9L6WNGS3Q-1337525334.us-east-1.elb.amazonaws.com/api/Player?PageNumber=" + pageNum + "&PageSize=" + pageSizing + "&SortString=" + sortString + "&SortOrder=" + sortOrder);
    request.subscribe((response) => {
      response.data.forEach(element => {
        this.players.push(element);
      });
      this.pages = response.pages;
      localStorage.setItem('pages', JSON.stringify(this.pages));

    }, (error) => {
      alert("The API is down!");
    });

    return this.players;
  }


  GetPlayerHeaders(): string[] {
    this.headers = [];
    let request = this.http.get<HeaderEnvelope>("http://awseb-AWSEB-1BZF9L6WNGS3Q-1337525334.us-east-1.elb.amazonaws.com/api/Player/Headers");
    request.subscribe((response) => {
      response.data.forEach(element => {
        this.headers.push(element.columN_NAME); //.toLowerCase()
      });

    }, (error) => {
      alert("The API is down!");
    });
    return this.headers;
  }

  CreateTeam(teamname: string) {
    let request = this.http.post<Team>("http://awseb-AWSEB-1BZF9L6WNGS3Q-1337525334.us-east-1.elb.amazonaws.com/api/Team", {
      teamName: teamname
    } as Team);

    request.subscribe((response) => {
      // console.log(response + " => Team Created");
    }, (error) => {
      alert("The API is down!");
    });

  }

  UpdateTeam(teamname: string, players: number[]) {
    let request = this.http.put<PlayerSelections>("http://awseb-AWSEB-1BZF9L6WNGS3Q-1337525334.us-east-1.elb.amazonaws.com/api/PlayerSelection", {
      teamname: teamname,
      playerkeys: players
    }as PlayerSelections);

    request.subscribe((response) => {
      // console.log(response);
    }, (error) => {
      alert("The API is down!");
    });
  }

  getTeamPlayers(teamname: string, sortstring: string, sorttype: string){
   //the end point needs fixing!
   let request = this.http.get<PlayerEnvelope>("http://awseb-AWSEB-1BZF9L6WNGS3Q-1337525334.us-east-1.elb.amazonaws.com/api/Player/getPlayersFromTeam")
   request.subscribe()

  }
}