import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { LoginPageComponent } from './routers/login-page/login-page.component';
import { ManagePlayersComponent } from './routers/manage-players/manage-players.component';
import { TeamSummaryComponent } from './routers/team-summary/team-summary.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LogoutComponent } from './Components/logout/logout.component';
import { LogoComponent } from './Components/logo/logo.component';
import { TabsComponent } from './Components/tabs/tabs.component';
import { MyTeamsComponent } from './routers/my-teams/my-teams.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { LoadingComponent } from './Components/loading/loading.component';

import { AuthInterceptor } from './services/auth.interceptor';
import { NavService } from './services/nav-service.service';
import { PlayersService } from './services/players.service';
import { TeamsService } from './services/teams-service.service';
import { UserService } from './services/user.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import { PlayerTableComponent } from './components/player-table/player-table.component';
import { GenericListComponent } from './utilities/generic-list/generic-list.component'

// TODO Import Services 

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    ManagePlayersComponent,
    TeamSummaryComponent,
    LogoutComponent,
    LogoComponent,
    LoginComponent,
    RegisterComponent,
    TabsComponent,
    MyTeamsComponent,
    LoadingComponent,
    PlayerTableComponent,
    GenericListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:5001"], //you can add other domains here as well
        disallowedRoutes: []
      }
    }),
    BrowserAnimationsModule

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    NavService,
    PlayersService,
    TeamsService,
    UserService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
