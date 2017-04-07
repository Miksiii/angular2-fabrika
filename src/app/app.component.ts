import { Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';

// Custom components
import { AuthService } from './services/auth.service';
import { CoursesComponent } from './course/courses/courses.component';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'fa-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'] 
})
export class AppComponent implements OnInit {
  title = 'app works!';
  authObject;
  currentUser;

  constructor(
    private authService : AuthService,
    private af : AngularFire,
    private router : Router) {

    this.af.auth.subscribe(
      auth => {
        this.authObject = auth;

        // if auth is set but no local object then fetch the data 
        if(auth) {
          this.authService.getCurrentUser(auth.uid)
            .then(foo => foo.subscribe(user => {
              this.currentUser = user;
            }));
          // this.currentUser = this.authService.getCurrentUser(auth.uid);
        }
      }
    );

  }

  ngOnInit() {
  }


}
