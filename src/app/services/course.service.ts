import 'rxjs/add/operator/take'
import { ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

import { 
  AngularFire, 
  FirebaseListObservable, 
  FirebaseObjectObservable 
} from 'angularfire2';

@Injectable()
export class CourseService {

  courses : Observable<any[]>;
  users : Observable<any[]>;
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
      thumbnail: course.thumbnail.name
    })
    
    this.uploadCourseThumbnail(course.thumbnail, newCourse.key);
  }

  // https://github.com/jlmonteagudo/upload-firebase
  // http://stackoverflow.com/questions/39173265/angular-2-change-for-file-upload
  uploadCourseThumbnail(thumbnail : any, courseKey) {
    let storageRef = firebase.storage().ref();
    let path = `courses/${courseKey}/thumbnails/${thumbnail.name}`;

    storageRef.child(path)
      .put(thumbnail)
      .then((snapshot) => {
        this.router.navigate(['/admin/dashboard/course', courseKey, 'overview']);
      });
  }  

  getThumbnailDownloadableURL(course : any) : Promise<any> {
    let pathToThumbnail = `courses/${course.$key}/thumbnails/${course.thumbnail}`;
    let storageRef = firebase.storage().ref()
                      .child(pathToThumbnail);

    return Promise.resolve(storageRef.getDownloadURL());
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

  //shopping cart!
  addCourse(userUID, courseKey) {
    console.log("called from add course!)");
    this.af.database.object(`/courses/${courseKey}/belongs_to/${userUID}`).set({
      uid: userUID,
      locked: true
    });
    this.af.database.object(`/users/${userUID}/courses/${courseKey}`).set({
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

  editLectureTitle(lectureKey, courseKey, newTitle) {
    this.af.database.object(`/lectures/${courseKey}/${lectureKey}`).update({
      title: newTitle
    });    
  }

  editSectionTitle(sectionKey, lectureKey, newTitle) {
    this.af.database.object(`/sections/${lectureKey}/${sectionKey}`).update({
      title: newTitle
    });    
  }  

}
