import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Team } from '../modules/team';
import { Player } from '../modules/player';

import { error } from '@angular/compiler/src/util';
import { PlayerEnvelope } from '../modules/playerEnvelope';
import { HeaderEnvelope } from '../modules/headerEnvelope';
import { Header } from '../modules/header';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  teams: Team[] = [];
  players: Player[] = [];
  pages: number;
  headers: Header[] = [];

  constructor(private http: HttpClient) { }

  GetAllTeams(): Team[] {
    let request = this.http.get<Team[]>("http://awseb-AWSEB-149WJIP2MPL2V-624299779.us-east-1.elb.amazonaws.com/api/Team");
    request.subscribe((response) => {
      response.forEach(element => {
        this.teams.push(element);
      });
    }, (error) => {
      alert("The API is down!");
    });
    return this.teams;
  }


  // PlayerSearch(): {
  //   let request = this.http.get<Team[]>("http://awseb-AWSEB-1659POZ6RBLZQ-1371454790.us-east-1.elb.amazonaws.com");
  //   request.subscribe((response) =>{

  //   }, (error) => {
  //     alert("The API is down!");
  //   });
  // }

  ViewPlayers(pageNum: number, pageSizing: number): Player[] {
    this.players = [];
    let request = this.http.get<PlayerEnvelope>("http://awseb-AWSEB-10QJV21J8A2ZQ-1516206366.us-east-1.elb.amazonaws.com/api/Player?PageNumber=" + pageNum + "&PageSize=" + pageSizing);
    request.subscribe((response) => {
      response.data.forEach(element => {
        this.players.push(element);
      });
      this.pages = response.pages;

    }, (error) => {
      alert("The API is down!");
    });
    return this.players
  }

  getPlayerHeaders() {
    let request = this.http.get<HeaderEnvelope>("http://awseb-AWSEB-10QJV21J8A2ZQ-1516206366.us-east-1.elb.amazonaws.com/api/Player/headers");
    request.subscribe((response) => {
      response.data.forEach(element => {
        this.headers.push(element);
      });
    }, (error) => {
      alert("The API is down!");
    });

    return this.headers;
  }

}