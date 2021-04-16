import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http-service.service';
import { ForTable } from '../../modules/forTable';
import { PlayerEnvelope } from 'src/app/modules/playerEnvelope';

@Component({
  selector: 'app-manage-players',
  templateUrl: './manage-players.component.html',
  styleUrls: ['./manage-players.component.css']
})
export class ManagePlayersComponent implements OnInit {

  players = [];
  headers: string[];
  pageNum: number = 1;
  pages: number;
  pageSize: number = 10;
  activeUpSort: string = '';
  activeDownSort: string = '';


  constructor(private httpService: HttpService) { }

  ngOnInit(): void {

    this.players = this.httpService.ViewPlayers(this.pageNum, this.pageSize);
    // this.pages = this.playerEnvelope.pages;
    this.headers = this.httpService.GetPlayerHeaders();
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
}
