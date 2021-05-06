import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NavService } from '../../services/nav-service.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private navService: NavService) { }

  ngOnInit(): void {
  }

  // When this function is called it will send an event (changeDisplay) to the parent
  @Output() changeDisplay = new EventEmitter()
  ChangeDisplay() {
    this.changeDisplay.emit();
  }

  // Occurs when a user attempts to login
  Login(username: string, password: string) {
    // Call login service with username and password
    // login must be a post that returns an auth token or NULL? nothing? idk?

    // login is successfull
    // localStorage.setItem('authToken', JSON.stringify());
    this.navService.NavMyTeam();

    // login is NOT successfull
  }
}
