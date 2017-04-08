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
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  courses : FirebaseListObservable<any[]>;
  currentUser : any = null;

  constructor(
    private af : AngularFire,
    private authService : AuthService,    
    private courseService : CourseService,
    private router : Router
  ) {
    this.af.auth.subscribe(
      auth => {
        if(auth) {
          this.authService.getCurrentUser(auth.uid)
            .then(foo => foo.subscribe(user => {
              this.currentUser = user;
              this.courseService.getWishListOfUserWithID(this.currentUser.$key)
                .then(courses => {
                  this.courses = courses;
                  console.log(this.courses);  
                });
            }));
        } else {
          this.af.auth.logout();
        }
    });
  }

  ngOnInit() {
  }

}
