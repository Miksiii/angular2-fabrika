import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Rx';

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

import { Course } from './../course';
import { CourseService } from './../course.service';

@Component({
  selector: 'fa-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.less']
})
export class CourseDetailComponent implements OnInit {

  course : any; 

  constructor(
    private route : ActivatedRoute,
    private courseService : CourseService, 
    private af : AngularFire
  ) { }

  ngOnInit() {
    this.route.params.
      switchMap((params : Params) => 
        this.course = this.courseService.getCourseByKey(+params['key']).
          then(course => this.course = course)).
      subscribe(course => this.course = course);

    //this.course = this.courseService.getCourseByKey(1).
      ///then(course => this.course = course);
      
//    console.log(this.course);
//    this.course = this.courseService.getCourseByKey(1)
//     .then(foo => {        
//       foo.subscribe(course => {
//         this.course = course;
//      });
//    });
  }

}
