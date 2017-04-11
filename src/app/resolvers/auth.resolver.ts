import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { 
  AngularFire, 
  FirebaseListObservable, 
  FirebaseObjectObservable, 
  AuthProviders, 
  AuthMethods 
} from 'angularfire2';

// Custom
import { AuthService } from './../services/auth.service';
import { UserService } from './../services/user.service';

@Injectable()
export class AuthResolver implements Resolve<any> {

  constructor(
    private af : AngularFire,
    private authService : AuthService,
    private userService : UserService
  ) {}

  resolve(route : ActivatedRouteSnapshot, state : RouterStateSnapshot) {
    console.log("callezino");
    this.af.auth.subscribe(auth => {
      if (auth) {
        if(!this.authService.currentUser) {
          this.userService.getUserByKey(auth.uid)
            .then(foo => foo.subscribe(snapshot => {
              this.authService.currentUser = snapshot;
            }));
        }
      }
    })
  }
}