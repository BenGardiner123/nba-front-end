import { Component, OnInit, OnDestroy } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { HttpService } from '../../services/http-service.service';
import { NavService } from '../../services/nav-service.service'
import { CurrentTeamService } from '../../services/current-team.service'

import { Player } from '../../modules/player';
import { PlayerEnvelope } from 'src/app/modules/playerEnvelope';
import { browserRefresh } from '../../app.component';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import { faSortUp } from '@fortawesome/free-solid-svg-icons';
import { PlayerSelections } from 'src/app/modules/playerSelections';
import * as $ from "jquery";

@Component({
  selector: 'app-manage-players',
  templateUrl: './manage-players.component.html',
  styleUrls: ['./manage-players.component.css']
})
export class ManagePlayersComponent implements OnInit {

  faSortIcon = faSort;
  faSortIconUp = faSortUp;
  faSortIconDown = faSortDown;

  teamName: string;
  players = [];
  headers: string[];
  pageNum: number = 1;
  pages: number = 1;
  pageSize: number = 10;
  sortString: string = 'FIRSTNAME';
  sortOrder: string = 'ASC';
  activeUpSort: string = '';
  activeDownSort: string = '';
  selectedPlayersKeys: number[] = [];
  selectedPlayers: Player[] = [];
  refreshed: boolean;
  playerSearched: boolean = false;
  searchString?: string = '';
  playerSelection: PlayerSelections;

  constructor(private httpService: HttpService, private navService: NavService, private currentTeamService: CurrentTeamService) {
    this.teamName = this.currentTeamService.teamName;

    //detects browser refresh
    this.refreshed = browserRefresh;
  }

  ngOnInit(): void {
    this.players = this.httpService.ViewPlayers(this.pageNum, this.pageSize, this.sortString, this.sortOrder);
    this.headers = this.httpService.GetPlayerHeaders();
    this.headers.unshift('selected');
    this.selectedPlayersKeys = this.currentTeamService.playerKeys;
    this.selectedPlayers = this.currentTeamService.players;

    //used an observable to get the pages and localstorage to keep the pages on refresh
    of(null).pipe(delay(600)).subscribe(() => {
      if (this.refreshed == false) {
        this.pages = this.httpService.pages;
        localStorage.setItem('pages', JSON.stringify(this.pages));
      }
      else if (localStorage.getItem('pages') != null && Number(JSON.parse(localStorage.getItem('pages'))) > 1) {
        this.pages = Number(JSON.parse(localStorage.getItem('pages')));
        this.teamName = JSON.parse(localStorage.getItem('teamname'));
      }

    });
    
  }

  ngOnDestroy() {
    localStorage.removeItem('pages');
  }


  Searching() {
    this.pageNum = 1;

    if (this.searchString == '' || this.searchString == null) {
      alert("No search string was provided");
      return null;
    }
    this.playerSearched = true;
    this.players = this.httpService.PlayerSearch(this.pageNum, this.pageSize, this.searchString, this.sortString, this.sortOrder);

    of(null).pipe(delay(600)).subscribe(() => {
      this.pages = Number(JSON.parse(localStorage.getItem('playerSearchPages')));
    });

  }

  IncreasePage() {
    if (this.pageNum < this.pages) {
      this.pageNum += 1;
      if (this.playerSearched == false) {
        this.players = this.httpService.ViewPlayers(this.pageNum, this.pageSize, this.sortString, this.sortOrder);
      }
      else {
        this.players = this.httpService.PlayerSearch(this.pageNum, this.pageSize, this.searchString, this.sortString, this.sortOrder);
      }
    }
  }

  DecreasePage() {
    if (this.pageNum > 1) {
      this.pageNum -= 1;
      if (this.playerSearched == false) {
        this.players = this.httpService.ViewPlayers(this.pageNum, this.pageSize, this.sortString, this.sortOrder);
      }
      else {
        this.players = this.httpService.PlayerSearch(this.pageNum, this.pageSize, this.searchString, this.sortString, this.sortOrder);
      }
    }
  }

  Sorting(sortElement) {
    this.sortString = sortElement;

    if (this.activeUpSort == sortElement) {
      this.activeUpSort = '';
      this.activeDownSort = sortElement;
      this.sortOrder = 'DESC';
    }
    else if ((this.activeDownSort == sortElement) && (this.activeUpSort == '')) {
      this.activeDownSort = '';
      this.activeUpSort = '';
      this.sortString = 'FIRSTNAME';
      this.sortOrder = 'ASC';
    }
    else {
      this.activeDownSort = '';
      this.activeUpSort = sortElement;
      this.sortOrder = 'ASC';
    }

    if (sortElement == 'selected') {
      this.SortSelected();
      return;
    }

    if (this.searchString == '') {
      this.players = this.httpService.ViewPlayers(this.pageNum, this.pageSize, this.sortString, this.sortOrder);
    }
    else {
      this.players = this.httpService.PlayerSearch(this.pageNum, this.pageSize, this.searchString, this.sortString, this.sortOrder);
      of(null).pipe(delay(500)).subscribe(() => {
        this.pages = Number(JSON.parse(localStorage.getItem('playerSearchPages')));
      });
    }
  }

  SortSelected() {
    this.players = this.selectedPlayers;

  }

  ManageSelectedPlayers(player: Player) {
    // If player already selected
    if (this.selectedPlayersKeys.includes(player.player_key)) {
      let index = this.selectedPlayersKeys.indexOf(player.player_key);
      this.selectedPlayersKeys.splice(index, 1);
      this.selectedPlayers.splice(index, 1);
    }
    // Check that selectedPlayerKeys arent full
    else if (this.selectedPlayersKeys.length < 15) {
      this.selectedPlayersKeys.push(player.player_key);
      this.selectedPlayers.push(player);
    }
    // selectedPlayers are full
    else {
      // Error
    }
  }

  //to keep track of the value in search input
  onKeyUp(searchVal: string) {
    this.searchString = searchVal;

    this.activeDownSort = '';
    this.activeUpSort = '';
    this.sortString = 'FIRSTNAME';
    this.sortOrder = 'ASC';
  }

  NavTeamSummary() {
    this.currentTeamService.playerKeys = this.selectedPlayersKeys;
    this.currentTeamService.players = this.selectedPlayers;
    this.currentTeamService.teamName = JSON.parse(localStorage.getItem('teamname'));
    this.navService.NavTeamSummary(this.teamName);
  }

  SaveTeam() {
    if(this.selectedPlayersKeys.length != 0){
      this.httpService.UpdateTeam(this.teamName, this.selectedPlayersKeys);
    }
    
    this.selectedPlayers = [];
    this.selectedPlayersKeys = [];
    localStorage.removeItem('teamname');
    
    this.navService.NavLandingPage();
  }
}
