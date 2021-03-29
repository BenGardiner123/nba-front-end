import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-players',
  templateUrl: './view-players.component.html',
  styleUrls: ['./view-players.component.css']
})
export class ViewPlayersComponent implements OnInit {

  playerNo: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
