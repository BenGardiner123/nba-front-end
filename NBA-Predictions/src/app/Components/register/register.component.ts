import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // When this function is called it will send an event (changeDisplay) to the parent
  @Output() changeDisplay = new EventEmitter()
  ChangeDisplay() {
    this.changeDisplay.emit();
  }

  // Occurs when a user attempts to login
  Register(username: string, password: string) {
    // Call register service with username and password
    // Register must be a post that returns whether the action was siccessfull or not.

    // Registration is successfull

    // Registartion is NOT successfull
  }
}
