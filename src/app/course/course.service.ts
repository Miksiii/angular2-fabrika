import 'rxjs/add/operator/take'
import {Observable} from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Course } from './course';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Injectable()
export class CourseService {

  courses : Observable<any[]>; // $add, $save.. $get
  course : FirebaseObjectObservable<any>;

  constructor(private af : AngularFire) {
    this.courses = this.af.database.list('/courses');
  }

  getCourses() : Promise<FirebaseListObservable<Course[]>> {
    return Promise.resolve(this.courses);
  }
 
  getCourseByKey(key : number) : Promise<FirebaseObjectObservable<Course>> {
    //return Promise.resolve(this.af.database.object('/courses/' + key));
    return new Promise(
        (resolve) => {
          this.af.database.object('/courses/' + key).subscribe(course => {
            resolve(course);
          });
        }
      );
  }

}
