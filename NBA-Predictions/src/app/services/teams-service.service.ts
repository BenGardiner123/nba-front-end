import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  token = localStorage.getItem('token');
  APIURL = "https://localhost:5001/";
  // APIURL: string = 'http://awseb-AWSEB-1BZF9L6WNGS3Q-1337525334.us-east-1.elb.amazonaws.com/api/';

  // Create a new team for a user
  CreateTeam() {

  }

  // Gets all teams for a user
  GetAllTeams() {

  }

  // Updates a users specific team 
  // Requires sending the players keys for all the players of the newly udated team.
  // Uses api/PlayerSelection
  UpdateTeam() {

  }
}
