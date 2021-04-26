import { Injectable } from '@angular/core';

import { Player } from '../modules/player'

@Injectable({
  providedIn: 'root'
})
export class CurrentTeamService {
  constructor() { }

  teamName: string;
  playerKeys: number[] = [];
  players: Player[] = [];
}
