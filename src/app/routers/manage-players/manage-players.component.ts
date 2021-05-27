import { Component, OnInit, AfterViewInit } from '@angular/core';

import { NavService } from '../../services/nav-service.service'
import { TeamsService } from '../../services/teams-service.service'
import { LoadingService } from 'src/app/services/loading.service';
import { PlayersService } from '../../services/players.service'

import { Player } from '../../modules/player';
import { PlayerEnvelope } from 'src/app/modules/playerEnvelope';
import { Header } from 'src/app/modules/header';

import { faSort } from '@fortawesome/free-solid-svg-icons';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import { faSortUp } from '@fortawesome/free-solid-svg-icons';
import * as $ from "jquery";
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { max } from 'rxjs/operators';

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
  players: Player[] = [];
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
  error: boolean = false;

  constructor(
    private navService: NavService,
    private playerService: PlayersService,
    private teamsService: TeamsService,
    private loadingService: LoadingService,
    private router: Router) {
  }

  async ngOnInit(): Promise<void> {

    this.loadingService.StartLoading()

    this.teamName = sessionStorage.getItem('currentTeam');
    this.headers = await this.playerService.GetPlayerHeaders()
    let Response = await this.playerService.GetPlayersFromTeam(this.teamName);
    // For each already selected player, add their player key and add the player to selected players
    this.selectedPlayers = [...Response.pagedData]
    // Mapping the array of objects containing a single string attribute
    // Into that of a string array.
    // I feel like this could be done more efficiently with some map functions im not aware of.
    for (let i = 0; i < this.headers.length; i++) {
      this.headers.push(this.headers[0].columN_NAME);
      this.headers.shift();
    }
    // Put 'selected' at the front as its not sent through the API.
    this.headers.unshift('selected');

    this.playersEnvelope = await this.playerService.GetPlayers(this.pageNum, this.pageSize, this.searchString, this.sortString, this.sortOrder);
    this.players = [...this.playersEnvelope.data];
    this.pages = this.playersEnvelope.pages;


    this.selectedPlayers.forEach(player => {
      this.selectedPlayersKeys.push(player.player_key);
    });
    this.loadingService.StopLoading()
    // FreezeColumns awaits the returns of players and headers before being run
    this.FreezeColumns();
  }

  // FreezeColumns listens to when the widow resizes so it can recalculate the width of the columns in the table 
  // And subsequently stick the first coloumns in place depending on their width.
  public FreezeColumns() {
    let $headers = $('.header-container').slice(0, 3);
    // let $firstColumn = $('.firstColumn');
    // let $secondColumn = $('.secondColumn');
    // let $thirdColumn = $('.thirdColumn');

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
    // $firstColumn.each(function () {
    //   $(this).css({ "position": "sticky", "left": coloumnOfsets[0], "z-index": 1 })
    // })
    // $secondColumn.each(function () {
    //   $(this).css({ "position": "sticky", "left": coloumnOfsets[1], "z-index": 1 })

    // })
    // $thirdColumn.each(function () {
    //   $(this).css({ "position": "sticky", "left": coloumnOfsets[2], "z-index": 1 })
    // })
  }

  // Called everytime a user changes the value of the search input
  // Does a default GetPlayers call if empty
  CheckInputEmpty(searchValue: string) {
    if (searchValue == '') {
      this.searchString = ''
      this.GetPlayers();
    }
  }

  // Sends a list of player keys to the backend to tell it to set a team to those players
  async UpdateTeam(directory: string) {
    this.loadingService.StartLoading()
    await this.teamsService.UpdateTeam(this.teamName, this.selectedPlayersKeys);
    this.loadingService.StopLoading()
    this.router.navigateByUrl('/' + directory);
  }

  // function to allow for horizontal scrolling of table using mousewheel
  // https://stackoverflow.com/questions/59468926/horizontal-scroll-in-typescript
  scroll(event: WheelEvent): void {
    if (event.deltaY > 0) document.getElementById('tablecont')!.scrollLeft += 40;
    else document.getElementById('tablecont')!.scrollLeft -= 40;
    event.preventDefault();
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
    this.loadingService.StartLoading()
    // this.players = [];
    // if (this.sortString === 'selected') {
    //   // The page sizing will be reduced by the amount of selected players. But because a teams can contain 15 players where we only want 10 players returned
    //   // This could result in a negative sizing being sent, and so the 'Math.max()' will ensure that if that number is negative, 1 will be sent instead.
    //   let pageSize = Math.max(this.pageSize - this.selectedPlayers.length, 1);
    //   console.log(pageSize)

    //   // When players come back they might contain selected players. So they are chopped off the players lists and merged with the selected players
    //   // This results in one less player in the whole table however and so another call is made fetching more players to fill in this gap 
    //   // This could potentially result in GetPlayers being called 9 times for a single page to load. (NOT IDEAL)
    //   while (this.players.length < 10) {
    //     this.playersEnvelope = await this.playerService.GetPlayers(this.pageNum, pageSize, this.searchString, 'FIRSTNAME', 'ASC');
    //     this.players = [...this.playersEnvelope.data]
    //     console.log(this.players);
    //     this.selectedPlayers.forEach(selectedPlayer => {
    //       this.players.forEach(player => {
    //         // If the players returned by the service are already included in the selected players, remove them from the list of players
    //         // Player keys must be used to compare as even with [...] theses arrarys dont equate.
    //         if (player.player_key === selectedPlayer.player_key) {
    //           let index = this.players.indexOf(player)
    //           this.players.splice(index, 1);
    //         }
    //       });
    //     });
    //     this.players = this.selectedPlayers.concat(this.players)
    //     pageSize += 1;
    //   }
    //   if (pageSize === 1) {
    //     this.pages == 1
    //   }
    // }
    // else {
    this.playersEnvelope = await this.playerService.GetPlayers(this.pageNum, this.pageSize, this.searchString, this.sortString, this.sortOrder);
    this.players = this.playersEnvelope.data;
    this.pages = this.playersEnvelope.pages;
    // }
    this.loadingService.StopLoading()
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

  SelectedSorting() {
    this.players = this.selectedPlayers;
  }

  Sort(sortElement) {
    if (sortElement === 'selected') {
      this.SelectedSorting()
      return;
    }
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
    this.GetPlayers();
  }

  ManageSelectedPlayers(player: Player) {
    this.error = false;
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
      this.error = true;
    }
  }
}
