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
  players: Player[] = [];

  constructor(private httpService: HttpService, private navService: NavService, private currentTeamService: CurrentTeamService) {
    this.teamName = this.currentTeamService.teamName;
    this.players = this.currentTeamService.players;
  }

  ngOnInit(): void {
  }

  NavManagePlayers() {
    this.navService.NavManagePlayers();
  }

  SaveTeam() {
    // How is the API going to know what team im updating these players too.
    // Possible service to connect home to manage-players to send the team name, it will be neccessary for the heading h1
    // this.httpService.UpdateTeam(this.selectedPlayers);
    this.navService.NavLandingPage();
  }
}
