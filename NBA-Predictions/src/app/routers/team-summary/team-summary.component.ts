import { Component, OnInit, HostListener } from '@angular/core';

import { NavService } from '../../services/nav-service.service'
import { CurrentTeamService } from '../../services/current-team.service'
import { HttpService } from '../../services/http-service.service'


import { Player } from '../../modules/player'
import { browserRefresh } from '../../app.component';
import { of } from 'rxjs';
import { delay, timeout } from 'rxjs/operators';

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

  refreshed: boolean = false;

  constructor(private httpService: HttpService, private navService: NavService, private currentTeamService: CurrentTeamService) {
    this.teamName = this.currentTeamService.teamName;
    this.selectedPlayersKeys = this.currentTeamService.playerKeys;
    this.players = this.currentTeamService.players;
    //detects browser refresh
    this.refreshed = browserRefresh;
  }

  ngOnInit(): void {
    this.headers = this.httpService.GetPlayerHeaders();

    if (this.refreshed === true) {
      this.teamName = JSON.parse(localStorage.getItem('teamname'));

      this.selectedPlayersKeys = JSON.parse(localStorage.getItem('playerkeys'));
      this.players = JSON.parse(localStorage.getItem('teamplayers'));
    }

    // This is completely wrong but is only being done out of time restrictions
    of(null).pipe(delay(900)).subscribe(() => {
      // Delay to ensure that this happens after the headers are returned.
      // This part need to be executed after the headers are returned. 
      // Better alternative is we can have an observer or promise for when the headers are filled.
      this.OnPageResize();

    })

  }


  @HostListener('window:resize', ['$event'])
  OnPageResize() {
    let $headers = $('.header-container').slice(0, 2);
    let $firstColumn = $('.firstColumn');
    let $secondColumn = $('.secondColumn');
    let i = 0, coloumnOfsets = [0];

    // Getting offsets
    $headers.each(function () {
      console.log(this);
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
      console.log(this);
      $(this).css({ "position": "sticky", "left": coloumnOfsets[0], "z-index": 1 })
    })
    $secondColumn.each(function () {
      console.log(this);
      $(this).css({ "position": "sticky", "left": coloumnOfsets[1], "z-index": 1 })

    })
  }

  NavManagePlayers(teamName: string) {
    this.navService.NavManagePlayers(teamName);
    if (this.refreshed === true) {
      this.currentTeamService.teamName = JSON.parse(localStorage.getItem('teamname'));
      this.currentTeamService.playerKeys = JSON.parse(localStorage.getItem('playerkeys'));
      this.currentTeamService.players = JSON.parse(localStorage.getItem('teamplayers'));
    }

  }

  SaveTeam() {
    if (this.selectedPlayersKeys.length != 0) {
      this.httpService.UpdateTeam(this.teamName, this.selectedPlayersKeys);
    }

    this.selectedPlayersKeys = [];
    this.players = [];
    localStorage.removeItem('teamname');

    localStorage.setItem('playerkeys', JSON.stringify([]));
    localStorage.setItem('teamplayers', JSON.stringify([]));

    this.navService.NavLandingPage();
  }
}
