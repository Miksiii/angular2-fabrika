import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './../../other/user';
import { AuthService } from './../../other/auth.service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { Course } from './../../course/course';
import { CourseService } from './../../course/course.service'

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.less']
})
export class DashboardMainComponent implements OnInit {

  courses : FirebaseListObservable<Course[]>;

  constructor(
    private authService : AuthService,
    private courseService : CourseService,
    private af : AngularFire,
    private router : Router) {
    this.af.auth.subscribe(
      auth => {
        if (!auth) {
          this.router.navigateByUrl('/signin');
        }
      }
    );
  }

  ngOnInit() {
    this.courseService.getCourses()
      .then(courses => this.courses = courses);
  }

}
