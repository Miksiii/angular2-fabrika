import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { 
  AngularFire, 
  FirebaseObjectObservable
} from 'angularfire2';

// Custom components
import { CourseService } from './../../../../services/course.service';
import { UserService } from './../../../../services/user.service';

@Component({
  selector: 'fa-admin-users',
  templateUrl: './users-admin.component.html',
  styleUrls: ['./users-admin.component.less']
})
export class UsersAdminComponent implements OnInit {

  course : any;
  users : any;

  constructor(
    private route : ActivatedRoute,
    private courseService : CourseService,
    private userService : UserService,
    private af : AngularFire
  ) { }

  ngOnInit() {
    this.route.params.
      switchMap((params : Params) => 
        this.courseService.getCourseByKey(params['key'])).
          subscribe(foo => {
            foo.subscribe(course => {
              this.course = course;

              this.users = this.userService.getAllUsers()
                .then(foo => foo.subscribe(snapshot => {
                  this.course.users = snapshot.filter(user => {

                    for(let courseKey in user.courses) {
                      if (courseKey === this.course.$key) {
                        return true;
                      }

                      return false;
                    }
                  })
                }))

            })
          });
  }

}

