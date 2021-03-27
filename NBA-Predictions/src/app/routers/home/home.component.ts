import { Component, OnInit , OnDestroy , ViewEncapsulation } from '@angular/core';
// ViewEncapsulation to use body and html tag in a component

import { NavService } from '../../services/nav-service.service';


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentTeam = " ";
  buttonName = "Create";
  Teams = [];

  constructor(private navService: NavService) {  }

  ngOnInit(): void { 
    document.body.classList.add('landingPageBackgroundImage');
  }

  ngOnDestroy(){  //I am removing the class to prevent body backgroundImage from leaking to other components
    document.body.classList.remove('landingPageBackgroundImage'); 
  }

  navigate(){
    if(this.buttonName == "View"){
      this.navService.navViewTeam();
    }
    else{
      this.navService.navCreateTeam();
    }
  }

  inputVal(teamName: string){
    this.currentTeam = teamName;
    this.navService.getTeams(); // just for now do many requests -- but this will be done only once onInit()
    this.Teams = this.navService.Teams;

    for(let team in this.Teams){
      if(this.currentTeam == team){
        this.buttonName = "View";
      }
      else{
        this.buttonName = "Create";
      }
    }
  }

}
