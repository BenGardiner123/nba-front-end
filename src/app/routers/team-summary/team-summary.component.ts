import { Component, OnInit, HostListener } from '@angular/core';

import { NavService } from '../../services/nav-service.service'
import { TeamsService } from '../../services/teams-service.service'
import { PlayersService } from '../../services/players.service'
import { LoadingService } from '../../services/loading.service'

import { Player } from '../../modules/player';
import { Header } from 'src/app/modules/header';
import { GetPlayersFromTeamResponse } from 'src/app/modules/GetPlayersFromTeamResponse';

@Component({
  selector: 'app-team-summary',
  templateUrl: './team-summary.component.html',
  styleUrls: ['./team-summary.component.css']
})

export class TeamSummaryComponent implements OnInit {

  teamName: string;
  players: Player[] = [];
  getPlayersResponse: GetPlayersFromTeamResponse;
  headers: any[] = [];
  dtr: number;
  isGoodScore: boolean = false;
  isBadScore: boolean = false;

  constructor(
    private navService: NavService,
    private playerService: PlayersService,
    private loadingService: LoadingService,
    private teamsService: TeamsService) {
  }

  async ngOnInit(): Promise<void> {
    this.loadingService.StartLoading();
    this.teamName = sessionStorage.getItem('currentTeam');
    this.headers = await this.playerService.GetPlayerHeaders()
    // Mapping the array of objects containing a single string attribute
    // Into that of a string array.
    // I feel like this could be done more efficiently with some map functions im not aware of.
    for (let i = 0; i < this.headers.length; i++) {
      this.headers.push(this.headers[0].columN_NAME);
      this.headers.shift();
    }

    this.getPlayersResponse = await this.playerService.GetPlayersFromTeam(this.teamName);
    this.dtr = this.getPlayersResponse.dtr
    // Set dtr colour
    if (this.dtr > 0) {
      this.isGoodScore = true;
    }
    if (this.dtr < 0) {
      this.isBadScore = true;
    }
    this.players = this.getPlayersResponse.pagedData;
    this.loadingService.StopLoading();


    // OnPageResize awaits the returns of players and headers before being run
    this.FreezeColumns();
  }


  @HostListener('window:resize', ['$event'])
  FreezeColumns() {
    let $headers = $('.header-container').slice(0, 2);
    let $firstColumn = $('.firstColumn');
    let $secondColumn = $('.secondColumn');
    let i = 0, coloumnOfsets = [0];

    // Getting offsets
    $headers.each(function () {
      if (coloumnOfsets.length < 3) {
        coloumnOfsets.push(coloumnOfsets[i] + this.offsetWidth)
        i += 1;
      }
    })
    i = 0;

    // Setting offsets
    $headers.each(function () {
      $(this).css({ "position": "sticky", "left": coloumnOfsets[i], "z-index": 1 })
      i += 1;
    })
    $firstColumn.each(function () {
      $(this).css({ "position": "sticky", "left": coloumnOfsets[0], "z-index": 1 })
    })
    $secondColumn.each(function () {
      $(this).css({ "position": "sticky", "left": coloumnOfsets[1], "z-index": 1 })

    })
  }

  // function to allow for horizontal scrolling of table using mousewheel
  // https://stackoverflow.com/questions/59468926/horizontal-scroll-in-typescript
  scroll(event: WheelEvent): void {
    if (event.deltaY > 0) document.getElementById('tablecont')!.scrollLeft += 40;
    else document.getElementById('tablecont')!.scrollLeft -= 40;
    event.preventDefault();
  }
}