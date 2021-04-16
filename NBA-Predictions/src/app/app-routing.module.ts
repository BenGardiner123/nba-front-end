import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './routers/home/home.component';
import { ManagePlayersComponent } from './routers/manage-players/manage-players.component';
import { TeamSummaryComponent } from './routers/team-summary/team-summary.component';


const routes: Routes = [
  { path: "Home", component: HomeComponent },
  { path: "ManagePlayers", component: ManagePlayersComponent },
  { path: "TeamSummary", component: TeamSummaryComponent },

  { path: "**", redirectTo: "Home" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
