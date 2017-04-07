import { Component, OnInit } from '@angular/core';

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
    //this.course = new Course('', '', '', '');
  }

  createCourse() {
    this.courseService.createCourse(this.course);
    //this.course = new Course('', '', '', '');
  }

}
