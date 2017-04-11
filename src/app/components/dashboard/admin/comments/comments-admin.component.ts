import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { 
  AngularFire, 
  FirebaseObjectObservable
} from 'angularfire2';

// Custom components
import { CourseService } from './../../../../services/course.service';
import { CommentService } from './../../../../services/comment.service';

@Component({
  selector: 'fa-comments-admin',
  templateUrl: './comments-admin.component.html',
  styleUrls: ['./comments-admin.component.less']
})
export class CommentsAdminComponent implements OnInit {

  course : any;
  courses : any[];

  constructor(
    private route : ActivatedRoute,
    private courseService : CourseService,
    private commentService : CommentService,
    private af : AngularFire
  ) { }

  ngOnInit() {
    this.route.params.
      switchMap((params : Params) => 
        this.courseService.getCourseByKey(params['key'])).
          subscribe(foo => {
            foo.subscribe(course => {
              this.course = course;

              this.commentService.getCourseComments(this.course.$key)       
                .then(foo => foo.subscribe(snapshot => {
                  this.course.comments = snapshot;
                }));
            })
          });
  }

}
