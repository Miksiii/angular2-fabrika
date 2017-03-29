import { Component, OnInit, Input} from '@angular/core';
import { CourseService } from './../../../course/course.service';

@Component({
  selector: 'fa-form-section',
  templateUrl: './form-section.component.html',
  styleUrls: ['./form-section.component.less']
})
export class FormSectionComponent implements OnInit {

  @Input()
  lectureKey;
  section = {
    title: '',
    video: ''
  }

  constructor(private courseService : CourseService) { }

  ngOnInit() {
  }

  createSection() {
    this.courseService.createSection(this.lectureKey, this.section);
    this.section.title = '';
    this.section.video = '';
  }

}
