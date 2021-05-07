import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './routers/home/home.component';
import { ManagePlayersComponent } from './routers/manage-players/manage-players.component';
import { TeamSummaryComponent } from './routers/team-summary/team-summary.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LogoutComponent } from './Components/logout/logout.component';
import { LogoComponent } from './Components/logo/logo.component';
import { TabsComponent } from './Components/tabs/tabs.component';
import { RegisterComponent } from './routers/register/register.component';
import { LoginComponent } from './routers/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ManagePlayersComponent,
    TeamSummaryComponent,
    LogoutComponent,
    LogoComponent,
    TabsComponent,
    RegisterComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
