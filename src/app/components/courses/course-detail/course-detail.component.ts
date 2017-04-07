import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Rx';

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

// Custom components
import { CourseService } from './../../../services/course.service';
import { AuthService } from './../../../services/auth.service';
import { ShoppingCartService } from './../../../services/shopping-cart.service';

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
    private shoppingCartService : ShoppingCartService,
    private authService : AuthService,
    private af : AngularFire
  ) { }

  ngOnInit() {

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

    this.route.params.
      switchMap((params : Params) => 
        this.course = this.courseService.getCourseByKey(params['key'])).
          subscribe(foo => {
            foo.subscribe(course => {
              this.course = course;
            })
          });
  }

  addCourse(courseKey) {
    if(this.currentUser) {
      this.shoppingCartService.addCourse(this.currentUser.$key, courseKey);
      return;
    }

    this.shoppingCartService.myCoursesList.push(courseKey);

  }

  addCourseToWishList(courseKey) {
    if(this.currentUser) {  
      this.shoppingCartService.addCourseToWishList(this.currentUser.$key, courseKey);
      return;
    }

    this.shoppingCartService.coursesWishList.push(courseKey); 
  }

}
