import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http-service.service';
import { NavService } from '../../services/nav-service.service'
import { CurrentTeamService } from '../../services/current-team.service'

import { ForTable } from '../../modules/forTable';
import { Player } from '../../modules/player';
import { PlayerEnvelope } from 'src/app/modules/playerEnvelope';

@Component({
  selector: 'app-manage-players',
  templateUrl: './manage-players.component.html',
  styleUrls: ['./manage-players.component.css']
})
export class ManagePlayersComponent implements OnInit {

  teamName: string;
  players = [];
  headers: string[];
  pageNum: number = 1;
  pages: number;
  pageSize: number = 10;
  activeUpSort: string = '';
  activeDownSort: string = '';
  selectedPlayers: Player[] = [];


  constructor(private httpService: HttpService, private navService: NavService, private currentTeamService: CurrentTeamService) {
    this.teamName = this.currentTeamService.teamName;
  }

  ngOnInit(): void {
    this.players = this.httpService.ViewPlayers(this.pageNum, this.pageSize);
    this.headers = this.httpService.GetPlayerHeaders();
  }



  Searching(searchString: string) {
    console.log(searchString);
    // How tf is this going to work with pagination?
    // this.players = this.httpService.PlayerSearch();
  }

  IncreasePage() {
    if (this.pageNum < this.pages) {
      this.pageNum += 1;
      this.players = this.httpService.ViewPlayers(this.pageNum, this.pageSize);
    }
  }

  DecreasePage() {
    if (this.pageNum > 1) {
      this.pageNum -= 1;
      this.players = this.httpService.ViewPlayers(this.pageNum, this.pageSize);
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

  ManageSelectedPlayers(player: Player) {
    // If player already selected
    if (this.selectedPlayers.includes(player)) {
      let index = this.selectedPlayers.indexOf(player);
      this.selectedPlayers.splice(index, 1);
    }
    // Check that selectedPlayers arent full
    else if (this.selectedPlayers.length < 15) {
      this.selectedPlayers.push(player);
    }
    // selectedPlayers are full
    else {
      // Error
    }
  }

  NavTeamSummary() {
    this.navService.NavTeamSummary();
  }

  SaveTeam() {
    // this.httpService.UpdateTeam(this.selectedPlayers);
    this.navService.NavLandingPage();
  }
}
