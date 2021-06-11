import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NavService } from 'src/app/services/nav-service.service';
import { LoadingService } from 'src/app/services/loading.service';
import { UserService } from 'src/app/services/user.service';

import { LoginResponse } from 'src/app/modules/LoginResponse';
import { User } from 'src/app/modules/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  invalidInputs: string[] = [];
  isRegistered: boolean;
  isSuccessful: boolean;
  isCreated: boolean = false;

  constructor(
    private userService: UserService,
    private navigate: NavService,
    private loadingService: LoadingService) { }

  ngOnInit(): void {
  }

  async AttemptUserRegister(username, password) {

    if (!this.CheckInputs(username, password)) {
      return;
    }

    let credentials: User = {
      'username': username,
      'password': password
    }

    this.loadingService.StartLoading()
    var response = await this.userService.registerUser(credentials)
    var creationResponse = await this.userService.createNbaUserId(credentials.username);
    this.isRegistered = true;
    // Successful Registration
    if (response) {
      this.isSuccessful = true;
      this.isCreated = true;
    }
    else {
      this.isSuccessful = false;
    }

    this.loadingService.StopLoading()

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
    this.isRegistered = undefined;
    this.isSuccessful = undefined;
  }

  // Emitts an event of (changeDisplay) to parent 
  @Output() changeDisplay = new EventEmitter()
  ChangeDisplay() {
    this.changeDisplay.emit();
  }
}
