import { Component, OnInit } from '@angular/core';
import { NavService } from '../../services/nav-service.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  username: string;

  constructor(private navService: NavService) { }

  ngOnInit(): void {
    this.username = localStorage.getItem('username')
  }

  Logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.navService.NavLogin();
  }


}
