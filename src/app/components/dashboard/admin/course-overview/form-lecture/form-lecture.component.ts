import { Component, OnInit, Input } from '@angular/core';

// Custom components
import { CourseService } from './../../../../../services/course.service';

@Component({
  selector: 'fa-form-lecture',
  templateUrl: './form-lecture.component.html',
  styleUrls: ['./form-lecture.component.less']
})
export class FormLectureComponent implements OnInit {

  @Input()
  courseKey;
  lecture = {
    title: ''
  }

  constructor(private courseService : CourseService) { }

  ngOnInit() {
  }

  createLecture() {
    this.courseService.createLecture(this.courseKey, this.lecture.title);
    this.lecture.title = '';
  }    

}
