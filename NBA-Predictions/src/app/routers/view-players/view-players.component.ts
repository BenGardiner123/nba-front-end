import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http-service.service';

@Component({
  selector: 'app-view-players',
  templateUrl: './view-players.component.html',
  styleUrls: ['./view-players.component.css']
})
export class ViewPlayersComponent implements OnInit {

  players = [];
  header = ["Firstname", "Lastname","Age","Gp","Mins","+/-", "Ast", "Blk"];
  pageNum: number = 1;
  pages: number ;
  pageSize : number = 10; 

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.players = this.httpService.ViewPlayers(this.pageNum,this.pageSize);
    this.pages = this.httpService.pages;
  }

  IncreasePage(){
    if(this.pageNum < this.pages){
      this.pageNum += 1;
      this.players = this.httpService.ViewPlayers(this.pageNum,this.pageSize);
    }
  }

  DecreasePage(){
    if(this.pageNum > 1){
      this.pageNum -= 1;
      this.players = this.httpService.ViewPlayers(this.pageNum,this.pageSize);
      console.log(this.players);
    }
  }
}
