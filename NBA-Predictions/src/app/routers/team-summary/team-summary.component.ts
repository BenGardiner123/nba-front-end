import { Component, OnInit } from '@angular/core';

import { NavService } from '../../services/nav-service.service'
import { CurrentTeamService } from '../../services/current-team.service'
import { HttpService } from '../../services/http-service.service'

import { Player } from '../../modules/player'
import { browserRefresh } from '../../app.component';

@Component({
  selector: 'app-team-summary',
  templateUrl: './team-summary.component.html',
  styleUrls: ['./team-summary.component.css']
})
export class TeamSummaryComponent implements OnInit {

  teamName: string;
  headers: string[];
  selectedPlayersKeys: number[] = [];
  players: Player[] = [];

  refreshed: boolean = false;

  constructor(private httpService: HttpService, private navService: NavService, private currentTeamService: CurrentTeamService) {
    this.teamName = this.currentTeamService.teamName;
    this.selectedPlayersKeys = this.currentTeamService.playerKeys;
    this.players = this.currentTeamService.players;

    //detects browser refresh
    this.refreshed = browserRefresh;
  }

  ngOnInit(): void {
    this.headers = this.httpService.GetPlayerHeaders();
    if(this.refreshed == true){
      this.teamName = JSON.parse(localStorage.getItem('teamname'));
      this.selectedPlayersKeys = JSON.parse(localStorage.getItem('playerkeys'));
      this.players = JSON.parse(localStorage.getItem('teamplayers'));
    }

    console.log(this.players);
  }

  NavManagePlayers(teamName: string) {
    this.navService.NavManagePlayers(teamName);
    if(this.refreshed ==  true){
      this.currentTeamService.teamName = JSON.parse(localStorage.getItem('teamname'));
      this.currentTeamService.playerKeys = JSON.parse(localStorage.getItem('playerkeys'));
      this.currentTeamService.players = JSON.parse(localStorage.getItem('teamplayers'));
    }
    
  }

  SaveTeam() {
    if(this.selectedPlayersKeys.length != 0){
      this.httpService.UpdateTeam(this.teamName, this.selectedPlayersKeys);
    }
    
    this.selectedPlayersKeys = [];
    localStorage.removeItem('teamname');

    this.navService.NavLandingPage();
  }
}
