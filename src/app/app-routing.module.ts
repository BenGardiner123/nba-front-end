import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { AuthenticationGuard } from './guards/authentication.guard';

import { MyTeamsComponent } from './routers/my-teams/my-teams.component'
import { ManagePlayersComponent } from './routers/manage-players/manage-players.component';
import { LoginPageComponent } from './routers/login-page/login-page.component';
import { TeamSummaryComponent } from './routers/team-summary/team-summary.component';


const routes: Routes = [
  {
    path: "MyTeams", component: MyTeamsComponent
    , canActivate: [AuthenticationGuard]
  },
  {
    path: "ManagePlayers", component: ManagePlayersComponent
    , canActivate: [AuthenticationGuard]
  },
  {
    path: "TeamSummary", component: TeamSummaryComponent
    , canActivate: [AuthenticationGuard]
  },
  { path: "Login", component: LoginPageComponent },

  { path: "**", redirectTo: "Login" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
