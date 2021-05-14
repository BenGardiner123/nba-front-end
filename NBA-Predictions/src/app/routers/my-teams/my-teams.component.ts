import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service'
import { NavService } from '../../services/nav-service.service';
import { TeamsService } from '../../services/teams-service.service';

import { Team } from '../../modules/team';

import { faStar } from '@fortawesome/free-solid-svg-icons';
import { PlayersService } from 'src/app/services/players.service';


@Component({
  selector: 'app-my-teams',
  templateUrl: './my-teams.component.html',
  styleUrls: ['./my-teams.component.css']
})
export class MyTeamsComponent implements OnInit {

  highlightedTeam: Team;
  selectedTeams: Team[] = [];
  buttonValue = "View";
  faStarIcon = faStar;
  usersTeams: Team[] = [];

  username: string;
  token: string;
  invalidTeam: boolean;


  constructor(
    private userService: UserService,
    private navService: NavService,
    private playerService: PlayersService,
    private teamsService: TeamsService) {
  }

  ngOnInit(): void {
    this.token = JSON.parse(localStorage.getItem('token'));
    this.username = this.userService.username;
    // this.token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MjA5NTc0NDIsIlVzZXIiOiIxIn0.DSfXXXHBOt3om01m-w851WCR69TaDvWuVKOVzrfSw2Q"
    var promise = this.teamsService.GetAllTeams(this.token).then(response => {
    }, (error) => {
      console.log(error);
      alert("GetAllTeams is down!");
    }
    );
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
