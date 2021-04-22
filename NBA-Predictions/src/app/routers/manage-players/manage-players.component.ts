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
import { PlayerSelections } from 'src/app/modules/playerSelections';

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
  sortString: string = 'FIRSTNAME';
  sortOrder: string = 'ASC';
  activeUpSort: string = '';
  activeDownSort: string = '';
  selectedPlayers: Player[] = [];
  selectedPlayersKeys: number[] = [];
  checked = false;
  refreshed : boolean;
  sorticon = faSort;
  playerSearched: boolean = false;
  searchString? : string = '';
  playerSelection : PlayerSelections;

  constructor(private httpService: HttpService, private navService: NavService, private currentTeamService: CurrentTeamService) {
    // this.teamName = this.currentTeamService.teamName;

    //detects browser refresh
    this.refreshed = browserRefresh;
  }

  ngOnInit(): void {
    this.players = this.httpService.ViewPlayers(this.pageNum, this.pageSize, this.sortString, this.sortOrder);
    this.headers = this.httpService.GetPlayerHeaders();
    this.selectedPlayers = this.currentTeamService.players;

    //used an observable to get the pages and localstorage to keep the pages on refresh
    of(null).pipe(delay(650)).subscribe(() => {
      if(this.refreshed == false){
        this.pages = this.httpService.pages;
        localStorage.setItem('pages', JSON.stringify(this.pages));
      }
      else if(localStorage.getItem('pages') != null && Number(JSON.parse(localStorage.getItem('pages'))) > 1)
      {
        this.pages = Number(JSON.parse(localStorage.getItem('pages')));
      }
     
    });

    //get Team name
    of(null).pipe(delay(300)).subscribe(() => {
      this.teamName = JSON.parse(localStorage.getItem('team'));
    });

  }

  ngOnDestroy(){
    //remove the item when component is destroyed
    localStorage.removeItem('pages');
    localStorage.removeItem('team');
  }


  Searching(searchString: string) {
    this.searchString = searchString;
    this.pageNum = 1;

    if(searchString == '' || searchString == null){
      alert("No search string was provided");
      return null;
    }
    this.playerSearched = true;
    this.players = this.httpService.PlayerSearch(this.pageNum, this.pageSize, this.searchString, this.sortString, this.sortOrder);
    
    of(null).pipe(delay(500)).subscribe(() => {
      this.pages = Number(JSON.parse(localStorage.getItem('playerSearchPages')));
    });

  }

  IncreasePage() {
    if (this.pageNum < this.pages) {
      this.pageNum += 1;
      if(this.playerSearched == false){
        this.players = this.httpService.ViewPlayers(this.pageNum, this.pageSize, this.sortString, this.sortOrder);
      }
      else{
        this.players = this.httpService.PlayerSearch(this.pageNum, this.pageSize, this.searchString, this.sortString, this.sortOrder);
      }
    }
  }

  DecreasePage() {
    if (this.pageNum > 1) {
      this.pageNum -= 1;
      if(this.playerSearched == false){
        this.players = this.httpService.ViewPlayers(this.pageNum, this.pageSize, this.sortString, this.sortOrder);
      }
      else{
        this.players = this.httpService.PlayerSearch(this.pageNum, this.pageSize, this.searchString, this.sortString, this.sortOrder);
      }
    }
  }

  Sorting(sortElement) {
    let value = this.headers.indexOf(sortElement);
    this.sortString = this.headers[value];

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
    
    if(this.searchString == ''){
      this.players = this.httpService.ViewPlayers(this.pageNum, this.pageSize, this.sortString, this.sortOrder);
      return;
    }
    else if(this.searchString != '' && this.sortOrder == 'DESC') {
      this.players = this.httpService.PlayerSearch(this.pageNum, this.pageSize, this.searchString, this.sortString, this.sortOrder);
    }   
  }

  ManageSelectedPlayers(player: Player) {
    // If player already selected
    if (this.selectedPlayers.includes(player)) {
      let index = this.selectedPlayers.indexOf(player);
      let keyindex = this.selectedPlayersKeys.indexOf(player.player_key);
      this.selectedPlayers.splice(index, 1);
      this.selectedPlayersKeys.splice(keyindex, 1);
    }
    // Check that selectedPlayers arent full
    else if (this.selectedPlayers.length < 15) {
      this.selectedPlayers.push(player);
      this.selectedPlayersKeys.push(player.player_key);
    }
    // selectedPlayers are full
    else {
      // Error
    }
  }

  //to keep track of the value in search input
  onKeyUp(searchVal:string){
    this.searchString = searchVal;

    this.activeDownSort = '';
    this.activeUpSort = '';
    this.sortString = 'FIRSTNAME';
    this.sortOrder = 'ASC';
  }

  NavTeamSummary() {
    this.currentTeamService.players = this.selectedPlayers;
    this.navService.NavTeamSummary(this.teamName);
  }

  SaveTeam() {
    this.httpService.UpdateTeam(this.teamName, this.selectedPlayersKeys);
    this.navService.NavLandingPage();
  }
}
