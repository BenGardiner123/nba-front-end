import { Component, OnInit } from '@angular/core';
import { NavService } from '../../services/nav-service.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  username: string;

  constructor(private navService: NavService, private userService: UserService) { }

  ngOnInit(): void {
    this.username = this.userService.username;
  }

  Logout() {
    localStorage.removeItem('token');
    this.navService.NavLogin();
  }


}
