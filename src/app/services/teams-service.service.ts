import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Team } from '../modules/team';
import { environment } from 'src/environments/environment';


@Injectable({
	providedIn: 'root'
})
export class TeamsService {

	currentTeam: string = '';
	token = localStorage.getItem('token');

	 private APIURL = environment.apiURL + '/Teams'

	constructor(private http: HttpClient) { }

	UpdateCurrentTeam(currentTeam) {
		this.currentTeam = currentTeam;
		sessionStorage.setItem('currentTeam', this.currentTeam);
	}

	// Create a new team for a user
	CreateTeam(teamName: string): Promise<boolean> {
		this.token = JSON.parse(localStorage.getItem('token'));

		// Send a team name and expect a boolean depending on the success of the http
		let request = {
			"token": this.token,
			"teamName": teamName
		}
		return this.http.post<boolean>(`${this.APIURL}/addteam`, request).toPromise();
	}

	// Gets all teams for a user
	GetAllTeams(): Promise<Team[]> {
		this.token = JSON.parse(localStorage.getItem('token'));
		return this.http.post<Team[]>(`${this.APIURL}/getteams`, {
			"token": this.token
		}).toPromise();
	}

	DeleteTeam(teamName: string) {
		this.token = JSON.parse(localStorage.getItem('token'));
		let body = {
			"token": this.token,
			"teamName": teamName
		}
		this.http.put(`${this.APIURL}/deleteteam`, body).toPromise();
	}

	// Takes in a team and toggles its favourites value on the backend
	ToggleFavourite(team: Team) {
		this.token = JSON.parse(localStorage.getItem('token'));
		let body = {
			"token": this.token,
			"teamNames": team.teamName,
			"isFav": !team.isFav
		}
		this.http.put(`${this.APIURL}/setfavorites`, body).toPromise();
	}

	UpdateTeam(teamName: string, playerKeys: number[]): Promise<any> {

		//this is another bad example of hardcoding in variables that have to be changed line by line every time the iurl will change
		this.token = JSON.parse(localStorage.getItem('token'));
		return this.http.put(`${this.APIURL}/PlayerSelection/UpdatePlayerSelection`, {
			"token": this.token,
			"teamName": teamName,
			"playerKeys": playerKeys
		}).toPromise();
	}
}
