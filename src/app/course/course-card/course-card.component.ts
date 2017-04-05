import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire } from 'angularfire2';

import { Course } from './../course';
import { CourseService } from './../course.service';

@Component({
  selector: 'fa-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.less']
})
export class CourseCardComponent implements OnInit {

  @Input()
  course : any;
  @Input()
  routeContext;
  @Input()
  isDashboard;

  constructor(
    private router : Router,
    private af : AngularFire,
    private courseService : CourseService
  ) { }

  ngOnInit() {

    this.af.auth.subscribe(
      auth => {
        if(auth) {

          // if the context is dashboard then get the data
          // for extra details about the client's course
          if(this.isDashboard) {
            this.courseService.getCourseExtras(this.course.$key, auth.uid)
              .then(foo => foo.subscribe(extras => {
                this.course.extras = extras;
                console.log(this.course.extras);
              }));
          }

        }
      });

  }

  getCourseFriendlyURL() : string {
    return this.course.title.replace(/ /g, "-");
  }

  goToContext(isAllowed) {
    switch(this.routeContext) {
      case 'detail':
        this.router.navigate(['/course/', this.course.$key]);
        break;
      case 'overview':
        if(!isAllowed) {
          this.router.navigate(['/course/', this.course.$key, 'overview']);
        }
        break;
    }
  }

}
