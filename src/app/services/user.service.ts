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

@Injectable()
export class UserService {

  constructor(private af : AngularFire) {}

  save(key : string, username : string, email : string, password : string, isLoggedIn : boolean) {
    this.af.database.object('/users/' + key).set({
      uid: key,
      username: username,
      email: email,
      password: password,
      isLoggedIn: isLoggedIn,
      role: 'user'
    });
  }

  getAllUsers() : Promise<FirebaseListObservable<any[]>> {
    return Promise.resolve(this.af.database.list('/users'));
  }

  getUserByKey(key : string) : Promise<FirebaseObjectObservable<any>> {
    return Promise.resolve(this.af.database.object(`users/${key}`));
  }

  getUsersByCourse(courseKey : string) : Promise<FirebaseObjectObservable<any>> {
    return null;
  }

}
