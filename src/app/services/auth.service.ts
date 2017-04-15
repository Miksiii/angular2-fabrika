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
import * as firebase from 'firebase';

// Custom
import { LocalStorageService } from './local-storage.service';
import { CourseService } from './course.service';
import { UserService } from './user.service';

@Injectable()
export class AuthService {

  currentUser : any;
  err : string;

  constructor(
    private af : AngularFire,
    private router : Router,
    private courseService : CourseService,
    private userService : UserService,
    private localStorageService : LocalStorageService
  ) {}

  /**
   * The creation of new firebase user. In case of no errors then we 
   * want to create a new custom user on /users node with the basic
   * details. In case of errors we set an error message so we can 
   * output it on the signup component. 
   * 
   * @param email 
   * @param password 
   */
  createUser(email : string, password: string) {
    this.af.auth.createUser({
      email: email,
      password: password
    }).then(snapshot => {
      this.userService.save(snapshot.uid, "", email, password, false);
      this.login(email, password);
    }).catch(error => this.err = error.message);
  }

  /**
   * The firebase user authentication. In case of no errors then 
   * get other details about the firebase user from /users node, 
   * toggle isLoggedIn value, save wishlist from localstorage and 
   * redirect user to the right place regards his role.
   * 
   * @param email 
   * @param password 
   */
  login(email : string, password: string) : void {
    this.af.auth.login({
      email: email,
      password: password
    }, {
      provider: AuthProviders.Password,
      method: AuthMethods.Password
    }).then(snapshot => {
      this.af.database.object(`users/${firebase.auth().currentUser.uid}`)
        .subscribe(snapshot => {
          this.currentUser = snapshot;
          this.toggleLogin(true, this.currentUser.$key);
          this.localStorageService.onUserLoginSave(this.currentUser.$key); 
          this.redirectUserByRole(this.currentUser.role);
          this.err = '';
        })
    }).catch(error => {
      this.err = error.message;
    });
  }

  /**
   * Redirects user to the right place after login regards role.
   * 
   * @param role 
   */
  redirectUserByRole(role : string) {
    switch(role) {
      case "admin":
        this.router.navigate(['admin/dashboard/main']);
        break;
      case "user":
        this.router.navigate(['dashboard/main']);
        break;
    }
  }

  /**
   * Toggle login value (isLoggedIn) from the /users/user node
   * 
   * @param loginValue 
   * @param userKey 
   */
  toggleLogin(loginValue : boolean, userKey : string) {
    this.af.database.object(`users/${userKey}`).update({
      isLoggedIn: loginValue
    });
  }

  /**
   * Returns boolean value on whether the user is logged in or not. 
   * This method is being used in auth-guard service to protect the
   * routes.
   */
  isAuthenticated() : boolean {
    return (firebase.auth().currentUser !== null) ? true : false;
  }

  /**
   * Toggle the login value (isLoggedIn) on /users/user node and 
   * destroy the login session from the local storage.
   */
  signout() {
    this.toggleLogin(false, firebase.auth().currentUser.uid);
    this.af.auth.logout();
  }

  /**
   * Returns the currently active user
   */
  getCurrentUser() : Promise<FirebaseObjectObservable<any>>{
    return Promise.resolve(this.af.database.object(`users/${firebase.auth().currentUser.uid}`));
  }

  /**
   * Returns the uid without a promise
   */
  getCurrentUserID() : string {
    return firebase.auth().currentUser.uid;
  }

}
