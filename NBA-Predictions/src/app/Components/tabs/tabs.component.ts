import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {

  selectedTab: string;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.selectedTab = this.router.url;
    console.log(this.selectedTab);
  }

  Navigate(directory: string) {
    this.router.navigateByUrl('/' + directory);
  }

}
