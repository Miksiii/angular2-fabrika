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
  ) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log("can be here?" + this.checkLogin(state.url));
    return this.checkLogin(state.url);
  }

  checkLogin(URLcall) {
    if(this.authService.isAuthenticated()) { 
      return true;
    }

    this.authService.redirectUrl = URLcall;
    this.router.navigate(['/signin']);
    return false;
  }

}