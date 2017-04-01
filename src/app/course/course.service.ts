import 'rxjs/add/operator/take'
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Course } from './course';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Router } from '@angular/router';

@Injectable()
export class CourseService {

  courses : Observable<any[]>;
  course : FirebaseObjectObservable<any>;

  constructor(
    private af : AngularFire,
    private router : Router
  ) {
    this.courses = this.af.database.list('/courses');
  }

  getCourses() : Promise<FirebaseListObservable<Course[]>> {
    return Promise.resolve(this.af.database.list('/courses'));
  } 

  getMyCourses(userUID) : Promise<FirebaseListObservable<Course[]>> {
    
    return Promise.resolve(this.af.database.list('/courses', {
      query: {
        orderByChild: `belongs_to/${userUID}/locked`,
        equalTo: !null
      }
    }));
    /*
    the idea was to check if key exists (if equalTo not null)
    return Promise.resolve(this.af.database.list('/courses', {
      query: {
        orderByChild: `belongs_to/${userUID}`,
        equalTo: !null
      }
    }));   */
  }

  getCoursesOfUser(userUID) : Promise<FirebaseListObservable<Course[]>> {
    return Promise.resolve(this.af.database.list('/users/' + userUID + '/courses'));
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

  getCommentsOfCourseSection(courseKey : string, sectionKey) : Promise<FirebaseListObservable<any[]>> {
    return Promise.resolve(this.af.database.list(`comments/${courseKey}/${sectionKey}`));
  }

  createCourse(course) {
    let newCourse = this.af.database.list('courses').push({
      title: course.title,
      excerpt: course.excerpt,
      description: course.description,
      price: course.price, 
      thumbnail: course.thumbnail
    });
    this.router.navigate(['course', newCourse.key, 'overview']);
  }

  createLecture(courseKey, title) {
    this.af.database.list(`lectures/${courseKey}`).push({
      title: title
    });
  }

  createSection(lectureKey, section) {
    this.af.database.list(`sections/${lectureKey}`).push({
      title: section.title,
      videoId: section.video
    });
  }

  createComment(courseKey, sectionKey, comment) {
    this.af.database.list(`comments/${courseKey}/${sectionKey}`).push({
      username: comment.username,
      body: comment.body,
      date: comment.date
    });
  }


}
