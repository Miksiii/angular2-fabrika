import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { 
  AngularFire, 
  FirebaseListObservable, 
  FirebaseObjectObservable, 
  AuthProviders, 
  AuthMethods 
} from 'angularfire2';

import { ShoppingCartService } from './shopping-cart.service';

@Injectable()
export class AuthService {

  isLoggedIn : boolean = false;
  redirectUrl : string;
  courses : Observable<any>;
  currentUser : any;
  currentUserUID : string;

  constructor(
    private af : AngularFire,
    private router : Router,
    private shoppingCartService : ShoppingCartService 
  ) {}

  createUser(email : string, password: string) : void {
    this.af.auth.createUser({
      email: email,
      password: password
    })
    .then(
      (success) => {
        this.createCustomUser(success.uid, "", email, password, true, [0]);
        this.login(email, password);
      }
    )
    .catch(
      (error) => {
        console.log("ERRAA" + error);
      }
    );
  }

  // creates a new user with custom attributes:
  // af.database.list('/users/UID')
  createCustomUser(uid, username, email, password, isLoggedIn, courses) {
    this.af.database.object('/users/' + uid).set({
      uid: uid,
      username: "",
      email: email,
      password: password,
      isLoggedIn: isLoggedIn,
      courses: courses,
      role: 'user'
    });
  }

  // login user with AuthMethod and set current user values to:
  // this.currentUser
  login(email : string, password: string) : void {
    this.af.auth.login({
      email: email,
      password: password
    }, {
      provider: AuthProviders.Password,
      method: AuthMethods.Password
    })
    .then(success => {
      this.toggleAuth(success.uid, true);
      this.getCurrentUser(success.uid)
        .then(foo => foo.subscribe(user => {
          this.currentUser = user;
          let redirect = this.redirectUrl ? this.redirectUrl : '/dashboard/main';

          if(this.currentUser.role === 'admin') {
            this.router.navigate(['admin/dashboard/main']);
            return;
          }

          this.router.navigate(['/dashboard/main']);

        }))
    })
    .catch(error => {
      console.log(error.message);
    });
  }

  toggleAuth(uid : string, isLoggedIn : boolean) {
    this.isLoggedIn = isLoggedIn;
    this.af.database.object(`users/${uid}`)
     .update({isLoggedIn: isLoggedIn})
     .then(user => this.currentUser = user);
  }

  isAuthenticated() : boolean {
    let isAuthenticated;

    this.af.auth.subscribe(
      auth => {
        if(auth) {
          isAuthenticated = true;
        } else {
          isAuthenticated = false;
        }
      });

   return isAuthenticated;
  }

  getCurrentUser(uid : any) : Promise<FirebaseObjectObservable<any>>{
    return Promise.resolve(this.af.database.object(`users/${uid}`));
  }

  signout(uid : string) : void {
    this.currentUser = null;
    this.toggleAuth(uid, false);
    this.af.auth.logout();
    this.router.navigate(['browse']);
  }

}
