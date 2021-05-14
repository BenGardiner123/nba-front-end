import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NavService } from 'src/app/services/nav-service.service';
import { UserService } from 'src/app/services/user.service';

import { User } from 'src/app/modules/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  invalidInputs: string[] = [];
  failedLogin: boolean;

  constructor(private userService: UserService, private navService: NavService) { }

  ngOnInit(): void {
  }

  AttemptUserLogin(username, password) {

    if (!this.CheckInputs(username, password)) {
      return;
    }

    let credentials: User = {
      'username': username,
      'passwordHash': password
    }

    var promise = this.userService.loginUser(credentials).then(response => {
      localStorage.setItem('token', JSON.stringify(response.token));
      // If username and password dont yeild a correct login
      if (response.token === 'false') {
        this.failedLogin = true;
      }
      // Correct
      else {
        this.navService.NavMyTeams();
      }
    }, (error) => {
      alert("The User login is down!");
    }
    );
  }

  // Checks if username and password are empty.
  // True if both inputs are valid
  CheckInputs(username, password): boolean {
    // Reset errors
    this.ClearErrors();
    // Check that removing all spaces from a username leaves some amount of characters
    // A users shouldnt be able to be ' ' or '  ', '   ' ... etc
    if (!username.replace(/\s/g, '').length) {
      this.invalidInputs.push('username');
    }
    // Password isnt empty
    if (!password.length) {
      this.invalidInputs.push('password');
    }
    // Invalid
    if (this.invalidInputs.length) {
      return false;
    }
    // Valid
    else {
      return true;
    }
  }

  ClearErrors() {
    this.invalidInputs = [];
    this.failedLogin = false;
  }

  // Emitts an event of (changeDisplay) to parent 
  @Output() changeDisplay = new EventEmitter()
  ChangeDisplay() {
    this.changeDisplay.emit();
  }
}
