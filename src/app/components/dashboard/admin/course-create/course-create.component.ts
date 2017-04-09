import { Component, OnInit, ElementRef } from '@angular/core';

// Custom components
import { CourseService } from './../../../../services/course.service';

@Component({
  selector: 'fa-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.less']
})
export class CourseCreateComponent implements OnInit {

  course = {
    title: '',
    excerpt: '',
    description: '',
    price: '',
    thumbnail: ''
  }

  constructor(private courseService : CourseService) { }

  ngOnInit() {
  }

  fileAttached($event) {
    this.course.thumbnail = $event.target.files[0];
  }

  createCourse() {
    this.courseService.createCourse(this.course);
  }

}
