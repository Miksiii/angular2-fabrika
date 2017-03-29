import { Component, OnInit, Input } from '@angular/core';
import { CourseService } from './../../../course/course.service';

@Component({
  selector: 'fa-form-comment',
  templateUrl: './form-comment.component.html',
  styleUrls: ['./form-comment.component.less']
})
export class FormCommentComponent implements OnInit {

  @Input()
  courseKey;
  @Input()
  sectionKey;
  @Input() 
  username;
  comments;

  comment = {
    username: '',
    body: '',
    date: null
  }

  constructor(private courseService : CourseService) { }

  ngOnInit() {
    this.courseService.getCommentsOfCourseSection(this.courseKey, this.sectionKey)
      .then(foo => foo.subscribe(
        comments => {
          this.comments = comments;
        }
      ));
    this.comment.username = this.username;
    this.comment.date = new Date();
  }

  createComment() {
    this.courseService.createComment(this.courseKey, this.sectionKey, this.comment);
    this.comment.username = '';
    this.comment.body = '';
    this.comment.date = null;
  }

}
