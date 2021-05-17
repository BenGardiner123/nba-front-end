import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service'
import { NavService } from '../../services/nav-service.service';
import { TeamsService } from '../../services/teams-service.service';
import { PlayersService } from 'src/app/services/players.service';

import { Team } from '../../modules/team';

import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';



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
  faTimesIcon = faTimes;
  usersTeams: Team[] = [];

  username: string;
  token: string;
  isInvalidTeam: boolean;
  isExistingTeam: boolean;


  constructor(
    private userService: UserService,
    private navService: NavService,
    private playerService: PlayersService,
    private teamsService: TeamsService) {
  }

  async ngOnInit(): Promise<void> {
    this.token = JSON.parse(localStorage.getItem('token'));
    this.username = this.userService.username;
    // this.usersTeams = await this.teamsService.GetAllTeams();
    // console.log(this.usersTeams)
    // testing
    this.usersTeams = [
      {
        "teamName": "bob",
        "isFav": true,
        "playerCount": 4,
        "dtrScores": -63.920684931552041380
      },
      {
        "teamName": "steve",
        "isFav": false,
        "playerCount": 3,
        "dtrScores": -133.728165600769574711
      },
      {
        "teamName": "test",
        "isFav": false,
        "playerCount": 0,
        "dtrScores": 0.000000000000000000
      },
      {
        "teamName": "test1",
        "isFav": false,
        "playerCount": 0,
        "dtrScores": 0.000000000000000000
      }
    ]
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
    this.ReOrderTeams();
  }

  SelectTeam(team: Team) {
    // If not already selected, select
    if (!this.selectedTeams.includes(team)) {
      this.teamsService.currentTeam = team.teamName;
      this.selectedTeams.push(team);
      this.highlightedTeam = team;
    }
    // Else deselect
    else {
      this.teamsService.currentTeam = undefined;
      // Find position in selected teams and remove it 
      let index = this.selectedTeams.indexOf(team);
      this.selectedTeams.splice(index, 1);
      if (team === this.highlightedTeam) {
        this.highlightedTeam = undefined;
      }
    }
    this.ReOrderTeams();
  }

  // Reorders the selectedTeams list by their dtr
  ReOrderTeams() {
    //     while (true) {

    //       // 
    //       for
    // break;
    //     }
  }

  // Takes in a team and inverts its favourite: boolean
  ManageFavourites(team: Team) {
    this.teamsService.ToggleFavourite(team);
    team.isFav = !team.isFav
  }

  DeleteTeam(teamName: string) {
    // this.httpService.DeleteTeam(teamName);
  }

  async CreateTeam(teamName: string) {
    // Checking that teamname isnt just made of spaces
    if (!teamName.replace(/\s/g, '').length) {
      this.isInvalidTeam = true
      return;
    }
    let response: boolean = await this.teamsService.CreateTeam(teamName);
    if (!response) {
      // Team Already Exists
      this.isExistingTeam = true
    }
  }

  ClearError() {
    this.isInvalidTeam = false
  }
}
