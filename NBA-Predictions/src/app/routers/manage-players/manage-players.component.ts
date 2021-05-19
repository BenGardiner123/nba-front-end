import { Component, OnInit, HostListener } from '@angular/core';

import { NavService } from '../../services/nav-service.service'
import { TeamsService } from '../../services/teams-service.service'
import { PlayersService } from '../../services/players.service'

import { Player } from '../../modules/player';
import { PlayerEnvelope } from 'src/app/modules/playerEnvelope';
import { Header } from 'src/app/modules/header';

import { faSort } from '@fortawesome/free-solid-svg-icons';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import { faSortUp } from '@fortawesome/free-solid-svg-icons';
import * as $ from "jquery";
import { ActivatedRoute } from '@angular/router';

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
  playersEnvelope: PlayerEnvelope;
  players: Player[];
  headers: any[];
  selectedPlayers: Player[] = [];

  pageNum: number = 1;
  pages: number;
  pageSize: number = 10;
  sortString: string = 'FIRSTNAME';
  sortOrder: string = 'ASC';
  searchString: string = '';
  activeUpSort: string = '';
  activeDownSort: string = '';
  selectedPlayersKeys: number[] = [];

  constructor(
    private navService: NavService,
    private playerService: PlayersService,
    private teamsService: TeamsService, 
   ) {
  }

  
  async ngOnInit(): Promise<void> {
  
    this.teamName = this.teamsService.currentTeam;
    this.headers = await this.playerService.GetPlayerHeaders()
    // Mapping the array of objects containing a single string attribute
    // Into that of a string array.
    // I feel like this could be done more efficiently with some map functions im not aware of.
    for (let i = 0; i < this.headers.length; i++) {
      this.headers.push(this.headers[0].columN_NAME);
      this.headers.shift();
    }
    // Put 'selected' at the front as its not sent through the API.
    this.headers.unshift('selected');
    // console.log('ManagePlayers, Onit: ' + this.headers)

    this.playersEnvelope = await this.playerService.GetPlayers(this.pageNum, this.pageSize, this.searchString, this.sortString, this.sortOrder);
    this.players = this.playersEnvelope.data;
    this.pages = this.playersEnvelope.pages;
    // console.log('ManagePlayers, Onit: ' + this.players)


    // OnPageResize awaits the returns of players and headers before being run
    this.OnPageResize();
  }

  // OnPageResize listens to when the widow resizes so it can recalculate the width of the columns in the table 
  // And subsequently stick the first coloumns in place depending on their width.
  @HostListener('window:resize', ['$event'])
  OnPageResize() {
    // console.log('ManagePlayers, OnPageResize: ' + this.players)
    // FIXME This Loads after the tables and headers are filled with input
    // BUT not after the DOM has been filled and a column width is assignned.
    let $headers = $('.header-container').slice(0, 3);
    let $firstColumn = $('.firstColumn');
    let $secondColumn = $('.secondColumn');
    let $thirdColumn = $('.thirdColumn');

    let i = 0, coloumnOfsets = [0];
    // Getting offsets
    $headers.each(function () {
      let parentElement = this.parentElement;
      if (coloumnOfsets.length < 3) {
        coloumnOfsets.push(coloumnOfsets[i] + parentElement.offsetWidth)
        i += 1;
      }
    })
    i = 0;

    // Setting offsets
    $headers.each(function () {
      let parentElement = this.parentElement;
      $(parentElement).css({ "position": "sticky", "left": coloumnOfsets[i], "z-index": 1 })
      i += 1;
    })
    $firstColumn.each(function () {
      $(this).css({ "position": "sticky", "left": coloumnOfsets[0], "z-index": 1 })
    })
    $secondColumn.each(function () {
      $(this).css({ "position": "sticky", "left": coloumnOfsets[1], "z-index": 1 })

    })
    $thirdColumn.each(function () {
      $(this).css({ "position": "sticky", "left": coloumnOfsets[2], "z-index": 1 })
    })
  }

  // Called everytime a user changes the value of the search input
  // Dose a default GetPlayers call if empty
  CheckInputEmpty(searchValue: string) {
    console.log('ManagePlayers, CheckInputEmpty: ' + searchValue)
    if (searchValue == '') {
      this.searchString = ''
      this.GetPlayers();
    }
  }

  Search(searchValue: string) {
    // Validation
    // If the search has only spaces in it
    if (!searchValue.replace(/\s/g, '').length) {
      alert("No search string was provided");
      return;
    }
    this.pageNum = 1;
    this.searchString = searchValue;
    this.GetPlayers();
  }

  // Handles the GetPlayers API point (Just keeping it DRY)
  // Should be called after the global variables have been changed.
  async GetPlayers() {
    this.playersEnvelope = await this.playerService.GetPlayers(this.pageNum, this.pageSize, this.searchString, this.sortString, this.sortOrder);
    this.players = this.playersEnvelope.data;
    this.pages = this.playersEnvelope.pages;
  }

  IncreasePage() {
    if (this.pageNum < this.pages) {
      this.pageNum += 1;
      this.GetPlayers();
    }
  }

  DecreasePage() {
    if (this.pageNum > 1) {
      this.pageNum -= 1;
      this.GetPlayers();
    }
  }

  Sort(sortElement) {
    this.sortString = sortElement;

    // Logic for sorting
    // Set to defult if already sorting by selected
    if (sortElement == 'selected' && sortElement == this.activeUpSort) {
      this.activeDownSort = '';
      this.activeUpSort = '';
      this.sortString = 'FIRSTNAME';
      this.sortOrder = 'ASC';
    }
    // If already sorting set the sorting to down sort
    else if (this.activeUpSort == sortElement) {
      this.activeUpSort = '';
      this.activeDownSort = sortElement;
      this.sortOrder = 'DESC';
    }
    // If down sorting set to default
    else if ((this.activeDownSort == sortElement) && (this.activeUpSort == '')) {
      this.activeDownSort = '';
      this.activeUpSort = '';
      this.sortString = 'FIRSTNAME';
      this.sortOrder = 'ASC';
    }
    // If default set the sort to sortElement
    else {
      this.activeDownSort = '';
      this.activeUpSort = sortElement;
      this.sortOrder = 'ASC';
    }


    // Logic for filtering the already selected players to the top of the list
    if (this.activeUpSort == 'selected') {
      this.selectedPlayers.forEach(player => {
        let index = this.players.indexOf(player);
        this.players.splice(index, 1);
        this.players.unshift(player);
      });
      return;
    }
    this.GetPlayers();
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
    console.log('ManagePlayers, ManageSelectedPlayers: ' + this.selectedPlayersKeys)
  }
}
