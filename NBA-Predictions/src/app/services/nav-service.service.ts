import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class NavService {
  constructor(private router: Router) { }

  NavLandingPage() {
    this.router.navigateByUrl("/LandingPage");
  }

  NavManagePlayers(teamName: string) {
    if(localStorage.getItem('team') != null){
      localStorage.removeItem('team');
    }
    else{
      localStorage.setItem('team', JSON.stringify(teamName));
    }
    this.router.navigateByUrl("/ManagePlayers");
  }

  NavTeamSummary(teamName:string) {
    this.router.navigateByUrl("/TeamSummary");
    if(localStorage.getItem('team') != null){
      localStorage.removeItem('team');
    }
    else{
      localStorage.setItem('team', JSON.stringify(teamName));
    }
  }
}
