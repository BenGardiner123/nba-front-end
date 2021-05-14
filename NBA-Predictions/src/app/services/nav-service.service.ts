import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class NavService {
  constructor(private router: Router) { }

  NavMyTeam() {
    this.router.navigateByUrl("/MyTeams");
  }

  NavManagePlayers(teamName: string) {
    this.router.navigateByUrl("/ManagePlayers");
  }

  NavTeamSummary(teamName: string) {
    this.router.navigateByUrl("/TeamSummary");
  }

  NavMyTeams() {
    this.router.navigateByUrl("/MyTeams");
  }

  NavLogin() {
    this.router.navigateByUrl("/Login");
  }
}
