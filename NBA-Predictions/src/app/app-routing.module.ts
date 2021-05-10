import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthenticationGuard } from './guards/authentication.guard';

import { LoginPageComponent } from './routers/login-page/login-page.component'
import { MyTeamsComponent } from './routers/my-teams/my-teams.component'
import { ManagePlayersComponent } from './routers/manage-players/manage-players.component';
import { HomeComponent } from './routers/home/home.component';
import { LoginComponent } from './routers/login/login.component';
// import { ManagePlayersComponent } from './routers/manage-players/manage-players.component';
import { RegisterComponent } from './routers/register/register.component';
import { TeamSummaryComponent } from './routers/team-summary/team-summary.component';


const routes: Routes = [
  { path: "Home", component: HomeComponent, canActivate: [AuthenticationGuard]},
  // { path: "MyTeam", component: MyTeamComponent },
  { path: "ManagePlayers", component: ManagePlayersComponent, canActivate: [AuthenticationGuard] },
  { path: "TeamSummary", component: TeamSummaryComponent, canActivate: [AuthenticationGuard] },
  { path: "Login", component: LoginComponent},
  { path: "Register", component: RegisterComponent },

  { path: "**", redirectTo: "Login" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
