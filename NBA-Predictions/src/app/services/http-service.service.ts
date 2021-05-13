import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Team } from '../modules/team';
import { Player } from '../modules/player';

import { error } from '@angular/compiler/src/util';
import { PlayerEnvelope } from '../modules/playerEnvelope';
import { HeaderEnvelope } from '../modules/headerEnvelope';
import { PlayerSelections } from '../modules/playerSelections';
import { CurrentTeamService } from './current-team.service';
import { TeamPlayers } from '../modules/teamPlayers';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  teams: Team[];
  pages: number = 1;
  headers: string[];
  players: Player[] = [];
  teamPlayers: Player[] = [];
  teamPlayersKeys: number[] = [];
  APIURL: string = 'http://awseb-AWSEB-1BZF9L6WNGS3Q-1337525334.us-east-1.elb.amazonaws.com/api/';
  // APIURL = "https://localhost:5001/api";

  constructor(private http: HttpClient, private currentTeamService: CurrentTeamService) { }

  GetAllTeams(): Team[] {
    this.teams = [];
    let request = this.http.get<Team[]>(this.APIURL + "Team");
    request.subscribe((response) => {
      response.forEach(element => {
        this.teams.push(element);
      });
    }, (error) => {
      alert("The API is down!");
    });
    return this.teams;
  }

  //TODO Make this into promise 
  PlayerSearch(pageNum: number, pageSizing: number, searchstring: string, sortstring: string, sortorder: string): Player[] {
    this.players = [];
    localStorage.removeItem('playerSearchPages');
    let request = this.http.get<PlayerEnvelope>(this.APIURL + "Player/SearchPlayer?searchstring=" + searchstring + "&PageNumber=" + pageNum + "&PageSize=" + pageSizing + "&SortString=" + sortstring + "&SortOrder=" + sortorder);
    request.subscribe((response) => {
      response.data.forEach(element => {
        this.players.push(element);
      });
      if (response.pages == 0) {
        this.pages = 1;
      }
      else {
        this.pages = response.pages;
      }

      localStorage.setItem('playerSearchPages', JSON.stringify(this.pages));
    }, (error) => {
      alert("The API is down!");
    });
    return this.players;
  }


  ViewPlayers(pageNum: number, pageSizing: number, sortString: string, sortOrder: string): Player[] {
    this.players = [];
    let request = this.http.get<PlayerEnvelope>(this.APIURL + "Player?PageNumber=" + pageNum + "&PageSize=" + pageSizing + "&SortString=" + sortString + "&SortOrder=" + sortOrder);
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

  //edited
  GetPlayerHeaders(): string[] {
    this.headers = [];
    let request = this.http.get<HeaderEnvelope>(this.APIURL + "/Players/headers");
    request.subscribe((response) => {
      response.data.forEach(element => {
        this.headers.push(element.columN_NAME); //.toLowerCase()
      });

    }, (error) => {
      alert("The Column API is down!");
    });
    return this.headers;
  }

  CreateTeam(teamname: string) {
    let request = this.http.post<Team>(this.APIURL + "Team", {
      teamName: teamname
    } as Team);

    request.subscribe((response) => {
      // console.log(response + " => Team Created");
    }, (error) => {
      alert("The API is down!");
    });

  }

  UpdateTeam(teamname: string, players: number[]) {
    let request = this.http.put<PlayerSelections>(this.APIURL + "PlayerSelection", {
      teamname: teamname,
      playerkeys: players
    } as PlayerSelections);

    request.subscribe((response) => {
      // console.log(response);
    }, (error) => {
      alert("The API is down!");
    });
  }

  //editted to mathc the current endpoints
  //it grabs players of a user's team  
  getTeamPlayers(token: string, teamname: string, sortstring: string, sorttype: string): Player[] {
    this.teamPlayers = [];
    this.teamPlayersKeys = [];
    this.currentTeamService.playerKeys = [];

    var tPlayers: TeamPlayers = {
      "token": token,
      "teamName": teamname,
      "sortString": sortstring,
      "sortType": sorttype
    }

    let request = this.http.post<PlayerEnvelope>(this.APIURL + "/Players/getPlayersFromTeam", tPlayers)
    request.subscribe((response) => {
      response.data.forEach(element => {
        this.teamPlayers.push(element);
        this.currentTeamService.playerKeys.push(element.player_key);
      });

      localStorage.setItem('playerkeys', JSON.stringify(this.currentTeamService.playerKeys));
      localStorage.setItem('teamplayers', JSON.stringify(this.teamPlayers));
    }, (error) => {
      alert("The get team players API is down!");
    });

    return this.teamPlayers;
  }

}