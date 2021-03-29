import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
// ViewEncapsulation to use body and html tag in a component

import { NavService } from '../../services/nav-service.service';
import { HttpService } from '../../services/http-service.service';


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentTeam = " ";
  buttonName = "Create";
  Teams = [];

  constructor(private navService: NavService, private httpService: HttpService) { }

  ngOnInit(): void {
    // Grab all teams everytime the landing page is loaded
    // Team[] = this.httpService.GetAllTeams();
    document.body.classList.add('landingPageBackgroundImage');
  }

  ngOnDestroy() {  //I am removing the class to prevent body backgroundImage from leaking to other components
    document.body.classList.remove('landingPageBackgroundImage');
  }

  navigate() {
    if (this.buttonName == "View") {
      this.navService.navViewTeam();
    }
    else {
      this.navService.navCreateTeam();
    }
  }

  inputVal(teamName: string) {
    // console.log(teamName);
    if (this.Teams.includes(teamName)) {
      this.buttonName = 'View'
    }
    else {
      this.buttonName = 'Create'
    }
  }

}
