import { Component, OnInit } from '@angular/core';
import { PlayersService } from 'src/app/services/players.service';


@Component({
  selector: 'app-player-table',
  templateUrl: './player-table.component.html',
  styleUrls: ['./player-table.component.css']
})
export class PlayerTableComponent implements OnInit {

  constructor(private playerService: PlayersService) { }

  pageNum: number = 1;
  pages: number;
  pageSize: number = 20;
  searchString: string = '';
  sortString: string = 'FIRSTNAME';
  sortOrder: string = 'ASC';

  totalAmountOfRecords;
  playerData;
  
  displayColumns = [ 'player_key',
    'FIRSTNAME', 
    'LASTNAME', 
    'AGE',
    'GP',
    'MINS',
    'PLUS MINUS',
    'AST',
    'BLK',
    'BLKA',
    'OREB',
    'DREB',
    'FG_PCT',
    'FG3_PCT',
    'FG3A',
    'FG3M',
    'FGA',
    'FGM',
    'FT_PCT',
    'FTA',
    'FT',
    'W',
    'L',
    'W_PCT',
    'PF',
    'PFD',
    'REB',
    'TOV',
    'STL',
    'PTS']


  ngOnInit(): void {
    this.loadData();
  }

  async loadData(){
    this.playerData = await this.playerService.GetPlayers(this.pageNum, this.pageSize, this.searchString, this.sortString, this.sortOrder);
  }

  updatePagination(event: any){

  }

}
