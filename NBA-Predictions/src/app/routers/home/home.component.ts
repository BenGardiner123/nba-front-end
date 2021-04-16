import { Component, OnInit, OnDestroy } from '@angular/core';

import { NavService } from '../../services/nav-service.service';
import { HttpService } from '../../services/http-service.service';
import { CurrentTeamService } from '../../services/current-team.service';

import { Team } from '../../modules/team';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  buttonName = "Create";
  teams: Team[] = [];
  stringTeams = [];

  constructor(private navService: NavService, private httpService: HttpService, private currentTeamService: CurrentTeamService) { }

  ngOnInit(): void {
    // Grab all teams everytime the landing page is loaded
    this.teams = this.httpService.GetAllTeams();
    document.body.classList.add('landingPageBackgroundImage');
  }

  ngOnDestroy() {
    document.body.classList.remove('landingPageBackgroundImage');
  }

  Navigate(teamName: string) {
    this.currentTeamService.SetTeamName(teamName);
    if (this.buttonName == "View") {

      this.navService.NavTeamSummary();
    }
    else {
      this.navService.NavManagePlayers();
    }
  }

  UpdateInput(userInput: string) {
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
