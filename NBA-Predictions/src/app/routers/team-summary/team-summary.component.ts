import { Component, OnInit } from '@angular/core';
import { faSort } from '@fortawesome/free-solid-svg-icons';

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
  headers: string[];
  pageNum: number = 1;
  pages: number = 1;
  pageSize: number = 10;
  sortString: string = 'FIRSTNAME';
  sortOrder: string = 'ASC';
  activeUpSort: string = '';
  activeDownSort: string = '';
  selectedPlayers: Player[] = [];
  checked = false;
  refreshed : boolean;
  sorticon = faSort;


  constructor(private httpService: HttpService, private navService: NavService, private currentTeamService: CurrentTeamService) {
    this.teamName = this.currentTeamService.teamName;
    this.players = this.currentTeamService.players;
  }

  ngOnInit(): void {
    this.headers = this.httpService.GetPlayerHeaders();
  }

  NavManagePlayers(teamName: string) {
    this.navService.NavManagePlayers(teamName);
  }

  SaveTeam() {
    // How is the API going to know what team im updating these players too.
    // Possible service to connect home to manage-players to send the team name, it will be neccessary for the heading h1
    // this.httpService.UpdateTeam(this.selectedPlayers);
    this.navService.NavLandingPage();
  }

  IncreasePage() {
    if (this.pageNum < this.pages) {
      this.pageNum += 1;
      this.players = this.httpService.ViewPlayers(this.pageNum, this.pageSize, this.sortString, this.sortOrder);
    }
  }

  DecreasePage() {
    if (this.pageNum > 1) {
      this.pageNum -= 1;
      this.players = this.httpService.ViewPlayers(this.pageNum, this.pageSize, this.sortString, this.sortOrder);
    }
  }

  Sorting(sortElement) {
    if (this.activeUpSort == sortElement) {
      this.activeUpSort = '';
      this.activeDownSort = sortElement;
    }
    else if ((this.activeDownSort == sortElement) && (this.activeUpSort == '')) {
      this.activeDownSort = '';
      this.activeUpSort = '';
    }
    else {
      this.activeDownSort = '';
      this.activeUpSort = sortElement;
    }
    // Call HTTP sort 
  }
}
