import { Component, OnInit } from '@angular/core';

import { NavService } from '../../services/nav-service.service';
import { HttpService } from '../../services/http-service.service';
import { CurrentTeamService } from '../../services/current-team.service';

import { Team } from '../../modules/team';



@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {


  isDisplayLogin: boolean = true;
  isDisplayRegister: boolean = false;

  constructor(private navService: NavService, private httpService: HttpService) { }

  ngOnInit(): void {
  }

  ChangeDisplay() {
    this.isDisplayLogin = !this.isDisplayLogin;
    this.isDisplayRegister = !this.isDisplayRegister;
  }

}
