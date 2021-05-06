import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginPageComponent } from './routers/login-page/login-page.component';
import { ManagePlayersComponent } from './routers/manage-players/manage-players.component';
import { TeamSummaryComponent } from './routers/team-summary/team-summary.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LogoutComponent } from './Components/logout/logout.component';
import { LogoComponent } from './Components/logo/logo.component';
import { TabsComponent } from './Components/tabs/tabs.component';
import { MyTeamsComponent } from './routers/my-teams/my-teams.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
// TODO Import Services 

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    ManagePlayersComponent,
    TeamSummaryComponent,
    LogoutComponent,
    LogoComponent,
    TabsComponent,
    MyTeamsComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  providers: [
    // TODO Add services to providers list
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
