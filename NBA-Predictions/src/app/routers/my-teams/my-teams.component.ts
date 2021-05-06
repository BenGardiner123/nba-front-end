import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-teams',
  templateUrl: './my-teams.component.html',
  styleUrls: ['./my-teams.component.css']
})
export class MyTeamsComponent implements OnInit {

  // selectedTeams
  // usersTeams

  constructor() { }

  ngOnInit(): void {
    // Get all teams a user has and put them in usersTeams
  }

  // Occurs when a user clicks 'Select all teams' checkbox
  SelectAllTeams() {

  }

  CreateTeam(teamName: string) {
    // this.httpService.CreateTeam(teamName);
  }

}
