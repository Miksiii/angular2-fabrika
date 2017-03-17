import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import { FirebaseObjectObservable } from 'angularfire2';

import { Course } from './../course';
import { CourseService } from './../course.service';

@Component({
  selector: 'fa-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.less']
})
export class CourseDetailComponent implements OnInit {

  course : Course; 

  constructor(
    private route : ActivatedRoute,
    private courseService : CourseService
  ) { }

  ngOnInit() {
    //this.route.params.switchMap().subscribe(course => this.course => course);
    // this.courseService.getCourseByKey(1).
      // then(course => this.course = course);
    console.log(this.course);
  }

}
