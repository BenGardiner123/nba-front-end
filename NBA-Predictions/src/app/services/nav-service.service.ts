import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';

import { Team } from '../modules/team';

@Injectable({
  providedIn: 'root'
})
export class NavService {
  Teams : Team[];

  constructor(private router: Router, private http: HttpClient) { }

  navLandingPage() {
    this.router.navigateByUrl("/LandingPage");
  }

  navViewTeam() {
    this.router.navigateByUrl("/viewTeam");
  }

  navViewPlayers() {
    this.router.navigateByUrl("/viewPlayers");
  }

  navCreateTeam(){
    this.router.navigateByUrl("/createTeam");
  }

 // get all teams from the API
  getTeams(){
    let request = this.http.get<Team[]>("https://localhost:5001/NbaApi/GetTeams");
    request.subscribe((response) =>{
     this.Teams = response;      
    })
  }
}
