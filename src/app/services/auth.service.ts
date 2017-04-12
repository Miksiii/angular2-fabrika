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

// Custom
import { LocalStorageService } from './local-storage.service';
import { CourseService } from './course.service';
import { UserService } from './user.service';

@Injectable()
export class AuthService {

  isLoggedIn : boolean = false;
  redirectUrl : string;
  currentUser : any; // make it one page but if refresh call the method getuser(uid)
  err : string;

  constructor(
    private af : AngularFire,
    private router : Router,
    private courseService : CourseService,
    private userService : UserService,
    private localStorageService : LocalStorageService
  ) {
  }

  createUser(email : string, password: string) {
    this.af.auth.createUser({
      email: email,
      password: password
    }).then(snapshot => {
      this.userService.save(snapshot.uid, "", email, password, true);
      this.login(email, password);
    }).catch(error => this.err = error.message);
  }

  login(email : string, password: string) : void {
    this.af.auth.login({
      email: email,
      password: password
    }, {
      provider: AuthProviders.Password,
      method: AuthMethods.Password
    }).then(snapshot => {

      this.userService.getUserByKey(snapshot.uid)
        .then(foo => foo.subscribe(snapshot => {
          this.currentUser = snapshot;
          this.localStorageService.onUserLoginSave(this.currentUser.$key); 
          this.toggleLogin(true, this.currentUser.$key);
          console.log("sad");

          if(this.currentUser.role === 'admin') {
            this.router.navigate(['admin/dashboard/main']);
          } else {
            this.router.navigate(['/dashboard/main']);
          }
        }))

    }).catch(error => {
      this.err = error.message;
    });
  }

  toggleLogin(loginValue : boolean, userKey : string) {

    console.log("lvalue: " + loginValue + " key: " + userKey);

    this.af.database.object(`users/${userKey}`).update({
      isLoggedIn: loginValue
    });
  }

  isAuthenticated() : boolean {
    let isAuthenticated = false;

    this.af.auth.subscribe(auth => { if(auth) { isAuthenticated = true; } });

   return isAuthenticated;
  }

  signout(userKey : string) {
    this.currentUser.isLoggedIn = false;
    this.toggleLogin(false, this.currentUser.$key);
    this.af.auth.logout();
  }

  getCurrentUser(uid : any) : Promise<FirebaseObjectObservable<any>>{
    return Promise.resolve(this.af.database.object(`users/${uid}`));
  }

}
