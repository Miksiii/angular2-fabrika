import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './../../other/user';
import { AuthService } from './../../other/auth.service';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

import { Course } from './../../course/course';
import { CourseService } from './../../course/course.service';
import { ShoppingCartService } from './../../other/shopping-cart.service';

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.less']
})
export class DashboardMainComponent implements OnInit {

  courses : FirebaseListObservable<Course[]>;
  currentUser;

  constructor(
    private authService : AuthService,
    private af : AngularFire,
    private courseService : CourseService,
    private shoppingCartService : ShoppingCartService,
    private router : Router
  ) {
    this.af.auth.subscribe(
      auth => {
        if(auth) {
          this.authService.getCurrentUser(auth.uid)
            .then(foo => foo.subscribe(user => {
              this.currentUser = user;
              this.courseService.getMyCourses(this.currentUser.$key)
                .then(courses => {
                  this.courses = courses;  
                  console.log(this.courses);
                });
            }));
        }
      }
    );

  }

  ngOnInit() {

  }

}
