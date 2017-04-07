import { Component, OnInit, Input} from '@angular/core';

// Custom components
import { CourseService } from './../../../services/course.service';

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

  getYouTubeVideoUniqueKey(videoURL) : string {
    return videoURL.slice(-11);
  }

  createSection() {
    this.section.video = this.getYouTubeVideoUniqueKey(this.section.video);
    this.courseService.createSection(this.lectureKey, this.section);
    this.section.title = '';
    this.section.video = '';
  }

}
