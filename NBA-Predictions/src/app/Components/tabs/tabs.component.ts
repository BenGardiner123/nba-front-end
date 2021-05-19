import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TeamsService } from "../../services/teams-service.service";

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {

  selectedTab: string;
  currentTeam: string;

  constructor(private router: Router, private teamsService: TeamsService) {
  }

  ngOnInit(): void {
    this.selectedTab = this.router.url;
  }

  Navigate(directory: string) {
    this.currentTeam = this.teamsService.currentTeam;
    // Stops navigation if a team isnt selected in the MyTeams tab
    if (this.selectedTab === '/MyTeams' && this.currentTeam == '') {
      alert('Please select a team');
    }
    else {
      this.router.navigateByUrl('/' + directory);
    }
  }

}
