import { Component, OnInit } from '@angular/core';

import { NavService } from '../../services/nav-service.service';
import { TeamsService } from '../../services/teams-service.service';
import { LoadingService } from 'src/app/services/loading.service';
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
    private navService: NavService,
    private playerService: PlayersService,
    private teamsService: TeamsService,
    private loadingService: LoadingService) {
  }

  async ngOnInit(): Promise<void> {
    this.loadingService.ToggleLoading()
    this.token = localStorage.getItem('token');
    this.username = localStorage.getItem('username');
    this.usersTeams = await this.teamsService.GetAllTeams();
    this.loadingService.ToggleLoading()
    this.teamsService.currentTeam = '';
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
    this.selectedTeams.sort((a, b) => (a.dtrScores > b.dtrScores) ? 1 : -1);
  }

  // Takes in a team and inverts its favourite: boolean
  ManageFavourites(team: Team) {
    this.loadingService.ToggleLoading()
    this.teamsService.ToggleFavourite(team);
    this.loadingService.ToggleLoading()
    team.isFav = !team.isFav
  }

  async DeleteTeam(team: Team) {
    this.loadingService.ToggleLoading()
    await this.teamsService.DeleteTeam(team.teamName);
    this.loadingService.ToggleLoading()
    // Deleting team locally 
    let index = this.usersTeams.indexOf(team);
    this.usersTeams.splice(index, 1);
  }

  async CreateTeam(teamName: string) {
    // Clearing error messages
    this.ClearError();
    // Checking that teamname isnt just made of spaces
    if (!teamName.replace(/\s/g, '').length) {
      this.isInvalidTeam = true
      return;
    }
    this.loadingService.ToggleLoading()
    let response: boolean = await this.teamsService.CreateTeam(teamName);
    this.loadingService.ToggleLoading()
    if (!response) {
      // Team Already Exists
      this.isExistingTeam = true
      return;
    }
    // Adding team locally 
    this.usersTeams.push({
      "teamName": teamName,
      "isFav": false,
      "playerCount": 0,
      "dtrScores": 0
    })
  }

  ClearError() {
    this.isInvalidTeam = false
    this.isExistingTeam = false
  }
}
