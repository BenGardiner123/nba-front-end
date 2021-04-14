import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './routers/home/home.component';
import { ViewPlayersComponent } from '../app/routers/view-players/view-players.component';
import { ViewTeamsComponent } from '../app/routers/view-teams/view-teams.component';


const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "viewPlayers", component: ViewPlayersComponent },
  { path: "viewTeams", component: ViewTeamsComponent },

  { path: "**", redirectTo: "viewPlayers" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
