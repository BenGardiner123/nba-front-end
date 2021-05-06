import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginPageComponent } from './routers/login-page/login-page.component'
import { MyTeamsComponent } from './routers/my-teams/my-teams.component'
import { ManagePlayersComponent } from './routers/manage-players/manage-players.component';
import { TeamSummaryComponent } from './routers/team-summary/team-summary.component';


const routes: Routes = [
  { path: "LoginPage", component: LoginPageComponent },
  { path: "MyTeams", component: MyTeamsComponent },
  { path: "ManagePlayers", component: ManagePlayersComponent },
  { path: "TeamSummary", component: TeamSummaryComponent },

  { path: "**", redirectTo: "LoginPage" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
