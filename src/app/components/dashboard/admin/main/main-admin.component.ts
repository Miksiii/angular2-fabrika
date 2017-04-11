import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { 
  AngularFire, 
  FirebaseListObservable, 
  FirebaseObjectObservable 
} from 'angularfire2';

// Custom components
import { AuthService } from './../../../../services/auth.service';
import { CourseService } from './../../../../services/course.service';
import { CommentService } from './../../../../services/comment.service';

@Component({
  selector: 'app-main-admin',
  templateUrl: './main-admin.component.html',
  styleUrls: ['./main-admin.component.less']
})
export class DashboardMainAdminComponent implements OnInit {

  courses : any[];
  currentUser : any = null;

  constructor(
    private authService : AuthService,
    private af : AngularFire,
    private courseService : CourseService,
    private commentService : CommentService,
    private router : Router
  ) {
    this.af.auth.subscribe(
      auth => {
        if(auth) {
          this.authService.getCurrentUser(auth.uid)
            .then(foo => foo.subscribe(user => {
              this.currentUser = user;
              this.courseService.getCoursesByAuthor(this.currentUser.$key)
                .then(foo => foo.subscribe(courses => {
                  this.courses = courses;

                  // Get count of comments & students per course and bind the value
                  // to the single course (course.numberOfComments property)
                  for(let i = 0; i < this.courses.length; i++) {
                    this.commentService.getCourseComments(this.courses[i].$key)
                      .then(foo => foo.subscribe(snapshot => {
                        this.courses[i].numberOfComments = snapshot.length;
                      }));
                    
                    this.courses[i].numberOfStudents = this.getObjectLength(this.courses[i].belongs_to);
                  }

                }));              
            }));
        } else {
          this.af.auth.logout();
        }
      }
    );
  }

  ngOnInit() {
  }

  getObjectLength(obj) {
    let count = 0;

    for(let prop in obj) {
      if (obj.hasOwnProperty(prop)) count++;
    }

    return count;
  }

  toggleLock(courseKey, userKey, lock) {
    this.courseService.toggleLock(courseKey, userKey, !lock);
  }
}
