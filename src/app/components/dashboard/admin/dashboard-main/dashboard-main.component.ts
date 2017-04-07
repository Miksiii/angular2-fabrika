import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { 
  AngularFire, 
  FirebaseListObservable, 
  FirebaseObjectObservable 
} from 'angularfire2';

// Custom components
import { AuthService } from './../../services/auth.service';
import { CourseService } from './../../services/course.service';
import { ShoppingCartService } from './../../services/shopping-cart.service';

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.less']
})
export class DashboardMainComponent implements OnInit {

  courses : FirebaseListObservable<any[]>;
  currentUser;

  constructor(
    private authService : AuthService,
    private af : AngularFire,
    private courseService : CourseService,
    private shoppingCartService : ShoppingCartService,
    private router : Router
  ) {
    this.af.auth.subscribe(
      auth => {
        if(auth) {
          this.authService.getCurrentUser(auth.uid)
            .then(foo => foo.subscribe(user => {
              this.currentUser = user;

              if(this.currentUser.role === "user") {
                this.courseService.getMyCourses(this.currentUser.$key)
                  .then(courses => {
                    this.courses = courses;  
                  });
              }

              if (this.currentUser.role === 'admin') {
                this.courseService.getCoursesOfAuthor(this.currentUser.$key)
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
