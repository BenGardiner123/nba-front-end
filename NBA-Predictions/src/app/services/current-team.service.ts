import { Injectable } from '@angular/core';

import { Player } from '../modules/player'

@Injectable({
  providedIn: 'root'
})
export class CurrentTeamService {
  constructor() { }

  teamName: string;
  players: Player[];


  SetTeamName(teamName: string) {
    this.teamName = teamName;
  }
}
