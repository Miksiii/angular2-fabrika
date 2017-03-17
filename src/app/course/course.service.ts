import { Injectable } from '@angular/core';
import { Course } from './course';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Injectable()
export class CourseService {

  constructor(private af : AngularFire) {
  }

  getCourses() : Promise<FirebaseListObservable<Course[]>> {
    return Promise.resolve(this.af.database.list('/courses'));
  }
 
  getCourseByKey(key : number) : Promise<FirebaseObjectObservable<Course>> {
    // return Promise.resolve(this.af.database.object('/courses/1'));
    // var course : any;
    //var item = this.af.database.object('/courses/1', { preserveSnapshot: true });
    //item.subscribe(snapshot => {
    //  course = snapshot.val();
    //});
    //return course;
    return null;
  }

}
