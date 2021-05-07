import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private jwthelper: JwtHelperService) { }

  canActivate(){
    const token = localStorage.getItem('token');

    if(token && !this.jwthelper.isTokenExpired(token)){
      return true;
    }

  }
}
