import { Component, OnInit, OnDestroy } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

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
  pages: number = 1;
  pageSize: number = 10;
  activeUpSort: string = '';
  activeDownSort: string = '';
  selectedPlayers: Player[] = [];


  constructor(private httpService: HttpService, private navService: NavService, private currentTeamService: CurrentTeamService) {
    this.teamName = this.currentTeamService.teamName;

    //to get the pages from local storage when page refreshes
    if(localStorage.getItem('pages') != null && Number(JSON.parse(localStorage.getItem('pages'))) > 1){
      this.pages = Number(JSON.parse(localStorage.getItem('pages')));
    }
    
  }

  ngOnInit(): void {
    this.players = this.httpService.ViewPlayers(this.pageNum, this.pageSize);
    this.headers = this.httpService.GetPlayerHeaders();
    this.selectedPlayers = this.currentTeamService.players;
     
    // used an observable to get the pages and a conditions to only set the localStorage item at first
    if (this.pages == 1){
      of(null).pipe(delay(100)).subscribe(() => {
        this.pages = this.httpService.pages;
        console.log(this.pages + 'observable');
        localStorage.setItem('pages', JSON.stringify(this.pages));
      }); 
    }

  }

  ngOnDestroy(){
    //remove the item when component is destroyed
    localStorage.removeItem('pages');
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
    this.currentTeamService.players = this.selectedPlayers;
    this.navService.NavTeamSummary();
  }

  SaveTeam() {
    // this.httpService.UpdateTeam(this.selectedPlayers);
    this.navService.NavLandingPage();
  }
}
