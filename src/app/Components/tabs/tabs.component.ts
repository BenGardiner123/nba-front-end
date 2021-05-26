import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
    // If the current tab is Manage Players
    // Tell the parent to go update the players first
    if (this.selectedTab == '/ManagePlayers') {
      this.UpdateTeam(directory);
    }
    // Stops navigation if a team isnt selected in the MyTeams tab
    else if (this.selectedTab === '/MyTeams' && this.currentTeam == '') {
      alert('Please select a team');
    }
    else {
      this.router.navigateByUrl('/' + directory);
    }
  }

  // Emitts an event of (changeDisplay) to parent 
  @Output() updateTeam = new EventEmitter()
  UpdateTeam(directory: string) {
    this.updateTeam.emit(directory);
  }

}
