import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {

  // TODO Fix 'selected-tab' logic for applying styles
  selectedTab: string = 'TeamSummary';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  Navigate(directory: string) {
    this.selectedTab = directory;
    // console.log(this.selectedTab);
    this.router.navigateByUrl('/' + directory);
  }

}
