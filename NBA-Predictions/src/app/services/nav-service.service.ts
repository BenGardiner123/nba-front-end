import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class NavService {
  constructor(private router: Router) { }

  navLandingPage() {
    this.router.navigateByUrl("/LandingPage");
  }

  navViewTeam() {
    this.router.navigateByUrl("/viewTeams");
  }

  navViewPlayers() {
    this.router.navigateByUrl("/viewPlayers");
  }

  navCreateTeam() {
    this.router.navigateByUrl("/createTeam");
  }
}
