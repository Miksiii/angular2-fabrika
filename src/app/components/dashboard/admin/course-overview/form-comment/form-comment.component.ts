import { Component, OnInit, Input } from '@angular/core';

// Custom components
import { CourseService } from './../../../../../services/course.service';
import { CommentService } from './../../../../../services/comment.service';


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

  constructor(
    private courseService : CourseService,
    private commentService : CommentService
  ) { }

  ngOnInit() {
  }

  // whenever user clicks on new section, 
  // the courseKey and sectionKey changes
  ngOnChanges() {
    this.commentService.getCourseCommentsBySection(this.courseKey, this.sectionKey)
      .then(foo => foo.subscribe(
        snapshot => {
          this.comments = snapshot;
         }
      ));
    this.comment.username = this.username;
    this.comment.date = new Date();
  }

  createComment() {
    this.commentService.save(this.courseKey, this.sectionKey, this.comment);
    this.resetFormFields();
  }

  resetFormFields() {
    this.comment.username = '';
    this.comment.body = '';
    this.comment.date = null;
  }

}
