import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TabsService } from '../../services/tabs.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {

  // TODO Fix 'selected-tab' logic for applying styles
  selectedTab: string;

  constructor(private router: Router, private tabsService: TabsService ) {
    this.selectedTab = this.tabsService.currentTab;
   }

  ngOnInit(): void {
  }

  Navigate(directory: string) {
    this.tabsService.currentTab = directory;
    console.log(this.selectedTab);
    this.router.navigateByUrl('/' + directory);
   
  }

}
