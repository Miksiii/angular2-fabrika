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
    return Promise.resolve(this.af.database.list('/courses'));
  }
 
  getCourseByKey(key : any) : Promise<FirebaseObjectObservable<any>> {
    return Promise.resolve(this.af.database.object(`courses/${key}`));
  }

  createCourse(course) {
    this.af.database.list('courses').push({
      title: course.title,
      excerpt: course.excerpt,
      description: course.description,
      price: course.price, 
      thumbnail: course.thumbnail
    });
  }

}
