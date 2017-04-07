import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable, 
         AuthProviders, AuthMethods } from 'angularfire2';

@Injectable()
export class ShoppingCartService {

  coursesWishList : string[];
  myCoursesList : string[];

  constructor(
    private af : AngularFire
  ) {
    this.coursesWishList = [];
    this.myCoursesList = [];
  }

  addCourse(userUID, courseKey) {
    this.af.database.object(`/courses/${courseKey}/belongs_to/${userUID}`).set({
      uid: userUID,
      locked: true
    });    
  }

  addCourseToWishList(userUID, courseKey) {
    this.af.database.object('users/' + userUID + '/wishlist/' + courseKey).set({
      uid: userUID,
      locked: true
    });
  }

/*
  saveCoursesToNonAuthUser(courses, userUID, tableName) {
    for(let i = 0; i < courses.length; i++) {
      this.af.database.object('users/' + userUID + '/' + tableName + '/' + courseKey).set({
        locked: true,
      });
    }
  }
  */ 

}
