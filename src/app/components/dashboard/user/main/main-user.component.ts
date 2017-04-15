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

@Component({
  selector: 'app-main-user',
  templateUrl: './main-user.component.html',
  styleUrls: ['./main-user.component.less']
})
export class DashboardMainUserComponent implements OnInit {

  courses : FirebaseListObservable<any[]>;
  currentUser;

  constructor(
    private authService : AuthService,
    private af : AngularFire,
    private courseService : CourseService,
    private router : Router
  ) {
    this.af.auth.subscribe(
      auth => {
        if(auth) {
          this.authService.getCurrentUser()
            .then(foo => foo.subscribe(user => {
              this.currentUser = user;

              if(this.currentUser.role === "user") {
                this.courseService.getMyCourses(this.currentUser.$key)
                  .then(courses => {
                    this.courses = courses;  
                  });
              }

            }));
        } 
      }
    );

  }

  ngOnInit() {

  }

}
