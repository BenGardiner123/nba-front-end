import { Component, OnInit } from '@angular/core';

import { NavService } from '../../services/nav-service.service'
import { CurrentTeamService } from '../../services/current-team.service'
import { HttpService } from '../../services/http-service.service'

import { Player } from '../../modules/player'

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

  constructor(private httpService: HttpService, private navService: NavService, private currentTeamService: CurrentTeamService) {
    this.teamName = this.currentTeamService.teamName;
    this.selectedPlayersKeys = this.currentTeamService.playerKeys;
    this.players = this.currentTeamService.players;
  }

  ngOnInit(): void {
    this.headers = this.httpService.GetPlayerHeaders();
  }

  NavManagePlayers(teamName: string) {
    this.navService.NavManagePlayers(teamName);
  }

  SaveTeam() {
    this.httpService.UpdateTeam(this.teamName, this.selectedPlayersKeys);
    this.navService.NavLandingPage();
  }
}
