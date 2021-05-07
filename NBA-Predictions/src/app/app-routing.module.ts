import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './routers/home/home.component';
import { LoginComponent } from './routers/login/login.component';
import { ManagePlayersComponent } from './routers/manage-players/manage-players.component';
import { RegisterComponent } from './routers/register/register.component';
// import { ManagePlayersComponent } from './routers/manage-players/manage-players.component';
import { TeamSummaryComponent } from './routers/team-summary/team-summary.component';


const routes: Routes = [
  { path: "Home", component: HomeComponent },
  // { path: "MyTeam", component: MyTeamComponent },
  { path: "ManagePlayers", component: ManagePlayersComponent },
  { path: "TeamSummary", component: TeamSummaryComponent },
  { path: "Login", component: LoginComponent},
  { path: "Register", component: RegisterComponent },

  { path: "**", redirectTo: "Login" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
