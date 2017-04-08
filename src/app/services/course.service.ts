import 'rxjs/add/operator/take'
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { 
  AngularFire, 
  FirebaseListObservable, 
  FirebaseObjectObservable 
} from 'angularfire2';

@Injectable()
export class CourseService {

  courses : Observable<any[]>;
  course : FirebaseObjectObservable<any>;
  coursesWishList : string[];
  myCoursesList : string[];  

  constructor(
    private af : AngularFire,
    private router : Router
  ) {
    this.coursesWishList = [];
    this.myCoursesList = [];    
    this.courses = this.af.database.list('/courses');
  }

  getCourses() : Promise<FirebaseListObservable<any[]>> {
    return Promise.resolve(this.af.database.list('/courses'));
  } 

  getCourseByKey(key : any) : Promise<FirebaseObjectObservable<any>> {
    return Promise.resolve(this.af.database.object(`courses/${key}`));
  }

  getCourseExtras(courseKey, userUID) : Promise<FirebaseObjectObservable<any>> {
    return Promise.resolve(this.af.database.object(`courses/${courseKey}/belongs_to/${userUID}`));
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

  getWishListOfUserWithID(userID) : Promise<FirebaseListObservable<any[]>> {
    return Promise.resolve(this.af.database.list('/courses', {
      query: {
        orderByChild: `saved_by/${userID}/uid`,
        equalTo: userID
      }
    }));
  }

  getMyCourses(userUID) : Promise<FirebaseListObservable<any[]>> {
    return Promise.resolve(this.af.database.list('/courses', {
      query: {
        orderByChild: `belongs_to/${userUID}/uid`,
        equalTo: userUID
      }
    }));
  }

  getCoursesByAuthor(authorID) : Promise<FirebaseListObservable<any[]>> {
    return Promise.resolve(this.af.database.list('/courses', {
      query: {
        orderByChild: 'created_by',
        equalTo: authorID
      }
    }));    
  }

  getCoursesOfUser(userUID) : Promise<FirebaseListObservable<any[]>> {
    return Promise.resolve(this.af.database.list('/users/' + userUID + '/courses'));
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

  getCommentsByCourse(courseKey) {
    return Promise.resolve(this.af.database.list(`comments/${courseKey}`));
  }

  //shopping cart!
  addCourse(userUID, courseKey) {
    this.af.database.object(`/courses/${courseKey}/belongs_to/${userUID}`).set({
      uid: userUID,
      locked: true
    });    
  }

  addCourseToWishList(userKey, courseKey) {
    this.af.database.object(`/courses/${courseKey}/saved_by/${userKey}`).set({
      uid: userKey
    });
  }

  toggleLock(courseKey, userKey, lock) {
    this.af.database.object(`/courses/${courseKey}/belongs_to/${userKey}`).update({
      locked: lock
    });
  }

}
