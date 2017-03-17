import { Component, Input, OnInit } from '@angular/core';
import { Course } from './../course';

@Component({
  selector: 'fa-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.less']
})
export class CourseCardComponent implements OnInit {

  @Input()
  course : Course;

  constructor() { }

  ngOnInit() {
    
  }

  getCourseFriendlyURL() : string {
    return this.course.title.replace(/ /g, "-");
  }

}
