import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Rx';

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { 
  AngularFire, 
  FirebaseObjectObservable
} from 'angularfire2';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

// Custom components
import { CourseService } from './../../../services/course.service';
import { AuthService } from './../../../services/auth.service';
import { LocalStorageService } from './../../../services/local-storage.service';

@Component({
  selector: 'fa-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.less']
})
export class CourseDetailComponent implements OnInit {

  course : any; 
  courseKey : any;
  courses : any;
  currentUser;

  constructor(
    private route : ActivatedRoute,
    private courseService : CourseService,
    private authService : AuthService,
    private localStorageService : LocalStorageService,
    private af : AngularFire
  ) { }

  ngOnInit() {
    this.route.params.
      switchMap((params : Params) => 
        this.courseService.getCourseByKey(params['key'])).
          subscribe(foo => {
            foo.subscribe(course => {
              this.course = course;       
            })
          });
          
    this.af.auth.subscribe(
      auth => {
        if(auth) {
          this.authService.getCurrentUser(auth.uid)
            .then(foo => foo.subscribe(user => {
              this.currentUser = user;
            }));
        }
      }
    );
  }

  addCourse(courseKey) {
    if(this.currentUser) {
      this.courseService.addCourse(this.currentUser.$key, courseKey);
      return;
    }

    this.courseService.myCoursesList.push(courseKey);

  }

  addCourseToWishList(courseKey) {
    if(this.currentUser) {  
      this.courseService.addCourseToWishList(this.currentUser.$key, courseKey);
    } else {
      this.localStorageService.temporarySave(courseKey);
    }
    
  }

}
