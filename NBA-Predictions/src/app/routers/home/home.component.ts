import { Component, OnInit, OnDestroy } from '@angular/core';
// ViewEncapsulation to use body and html tag in a component

import { NavService } from '../../services/nav-service.service';
import { HttpService } from '../../services/http-service.service';
import { Team } from '../../modules/team';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentTeam = " ";
  buttonName = "Create";
  teams = [];
  stringTeams = [];

  constructor(private navService: NavService, private httpService: HttpService) { }

  ngOnInit(): void {
    // Grab all teams everytime the landing page is loaded
    this.teams = this.httpService.GetAllTeams();
    document.body.classList.add('landingPageBackgroundImage');
  }

  ngOnDestroy() {
    document.body.classList.remove('landingPageBackgroundImage');
  }

  navigate() {
    // Team Exists
    if (this.buttonName == "View") {
      this.navService.NavTeamSummary();
    }
    // Team DOSENT Exists
    else {
      this.navService.NavManagePlayers();
    }
  }

  inputVal(userInput: string) {

    // Minor error, shouldnt need to call every time a user inputs, cant do in init 
    this.teams.forEach(team => {
      this.stringTeams.push(team.teamName.toLowerCase());
    });

    if (this.stringTeams.includes(userInput.toLowerCase())) {
      this.buttonName = "View";
    }
    else {
      this.buttonName = "Create";
    }

  }



}
