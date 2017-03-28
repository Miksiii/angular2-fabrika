import { Component, OnInit } from '@angular/core';

import { CourseService } from './../course.service';
import { Course } from './../course';

@Component({
  selector: 'fa-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.less']
})
export class CourseCreateComponent implements OnInit {

  course; 

  constructor(private courseService : CourseService) { }

  ngOnInit() {
    this.course = new Course('', '', '', '');
  }

  createCourse() {
    this.courseService.createCourse(this.course);
    this.course = new Course('', '', '', '');
  }

}
