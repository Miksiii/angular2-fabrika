import { Injectable }     from '@angular/core';
import { Location }       from '@angular/common';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}                         from '@angular/router';
import { AngularFire }    from 'angularfire2';
import { AuthService }    from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService, 
    private router: Router,
    private af : AngularFire,
    private location : Location
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkForAuth(state.url);
  }

  checkForAuth(URLcall) {
    if(this.authService.isAuthenticated()) { 
      return true;
    }

    this.router.navigate(['signin']);
    return false;
  }

}