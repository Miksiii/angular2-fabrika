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

  getLecturesByCourseKey(key : string) : Promise<FirebaseListObservable<any[]>> {
    return Promise.resolve(this.af.database.list(`lectures/${key}`));
  }

  getSectionsByLectureKey(key : string) : Promise<FirebaseListObservable<any[]>> {
    return Promise.resolve(this.af.database.list(`sections/${key}`));
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

  createLecture(courseKey, title) {
    this.af.database.list(`lectures/${courseKey}`).push({
      title: title
    });
  }

  createSection(lectureKey, section) {
    this.af.database.list(`sections/${lectureKey}`).push({
      title: section.title,
      video: section.video
    });
  }

}
