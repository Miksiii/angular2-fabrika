import { Component, Input, OnInit} from '@angular/core';
import { CoursesComponent } from './course/courses/courses.component';
import { Router } from '@angular/router';

import { AuthService } from './other/auth.service';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'fa-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'] 
})
export class AppComponent implements OnInit {
  title = 'app works!';
  authObject;

  constructor(
    private authService : AuthService,
    private af : AngularFire,
    private router : Router) {
      this.af.auth.subscribe(
        auth => {
          this.authObject = auth;
        }
      );
  }

  ngOnInit() {
  }


}
