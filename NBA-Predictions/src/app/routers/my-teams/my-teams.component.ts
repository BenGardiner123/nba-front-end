import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service'
import { NavService } from '../../services/nav-service.service';
import { HttpService } from '../../services/http-service.service';
import { CurrentTeamService } from '../../services/current-team.service';

import { Team } from '../../modules/team';

import { faStar } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-my-teams',
  templateUrl: './my-teams.component.html',
  styleUrls: ['./my-teams.component.css']
})
export class MyTeamsComponent implements OnInit {

  highlightedTeam: Team;
  selectedTeams: Team[] = [];
  username: string;
  buttonValue = "View";
  faStarIcon = faStar;


  token: string;
  invalidTeam: boolean;

  usersTeams: Team[] = [
    {
      "teamName": "test"
    },
    {
      "teamName": "test2"
    },
    {
      "teamName": "test23"
    },
    {
      "teamName": "test1"
    },
    {
      "teamName": "test4"
    }
  ]

  constructor(
    private userService: UserService,
    private navService: NavService,
    private httpService: HttpService,
    private currentTeamService: CurrentTeamService) {
  }

  ngOnInit(): void {
    this.username = this.userService.username;
    // this.teams = this.httpService.GetAllTeams();
    this.token = JSON.parse(localStorage.getItem('token'));
  }

  // Occurs when a user clicks 'Select all teams' checkbox
  SelectAllTeams(isChecked) {
    if (isChecked) {
      this.selectedTeams = this.usersTeams;
    }
    // Everything already selected
    else {
      this.selectedTeams = [];
    }
    this.highlightedTeam = undefined;
  }

  SelectTeam(team: Team) {
    // If not already selected, select
    if (!this.selectedTeams.includes(team)) {
      this.selectedTeams.push(team);
      this.highlightedTeam = team;
    }
    // Else deselect
    else {
      // Find position in selected teams and remove it 
      let index = this.selectedTeams.indexOf(team);
      this.selectedTeams.splice(index, 1);
      if (team === this.highlightedTeam) {
        this.highlightedTeam = undefined;
      }
    }

    console.log(JSON.stringify(this.selectedTeams) == JSON.stringify(this.usersTeams))
    console.log(this.selectedTeams)
    console.log(this.usersTeams)
  }

  // Takes in a team and inverts its favourite: boolean
  ManageFavourites(team: Team) {

  }

  DeleteTeam(teamName: string) {
    // this.httpService.DeleteTeam(teamName);
  }

  CreateTeam(teamName: string) {
    // Checking that teamname isnt just made of spaces
    if (!teamName.replace(/\s/g, '').length) {
      this.invalidTeam = true
      return;
    }

  }

  ClearError() {
    this.invalidTeam = false
  }
}
