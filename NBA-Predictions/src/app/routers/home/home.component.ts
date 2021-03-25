import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core'; // to use body and html tag in a component
import { NavService } from '../../services/nav-service.service';


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  buttonName : string = "Create";

  constructor(private navService: NavService) { }

  navViewPlayer(){
    this.navService.navViewPlayers();
  }

  ngOnInit(): void {
  }

}
