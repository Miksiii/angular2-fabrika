import 'rxjs/add/operator/take'
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable, 
         AuthProviders, AuthMethods } from 'angularfire2';

@Injectable()
export class AuthService {

  constructor(
    private af : AngularFire,
    private router : Router
  ) {}

  createUser(email : string, password: string) : void {
    this.af.auth.createUser({
      email: email,
      password: password
    })
    .then(
      (success) => {
        this.router.navigateByUrl('/dashboard-main');
      }
    )
    .catch(
      (error) => {
        console.log("ERRAA" + error);
      }
    );
  }

  login(email : string, password: string) : void {
    this.af.auth.login({
      email: email,
      password: password
    }, {
      provider: AuthProviders.Password,
      method: AuthMethods.Password
    })
    .then(success => {
      this.router.navigateByUrl('/dashboard-main');
    })
    .catch(error => {
      console.log(error.message);
    });
  }

  signout() : void {
    this.af.auth.logout();
  }

}
