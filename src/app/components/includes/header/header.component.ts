import { SimpleChange, Component, OnInit, Input} from '@angular/core';
import { AngularFire } from 'angularfire2';

// Custom components
import { AuthService } from './../../../services/auth.service';
import { CourseService } from './../../../services/course.service';
import { LocalStorageService } from './../../../services/local-storage.service';

@Component({
  selector: 'fa-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  currentUser : any = null;
  wishlistCount : number;
  courselistCount : number;

  constructor(
    private authService : AuthService,
    private courseService : CourseService,
    private localStorageService : LocalStorageService,
    private af : AngularFire,
  ) { }

  ngOnInit() {
    this.af.auth.subscribe(
      auth => {
        if(auth) {
          this.authService.getCurrentUser()
            .then(foo => foo.subscribe(user => {
              this.currentUser = user;
            }));
          this.courseService.getWishListOfUserWithID(auth.uid)
            .then(foo => foo.subscribe(snapshot => {
              this.wishlistCount = snapshot.length;
            }));
          this.courseService.getCoursesOfUser(auth.uid)
            .then(foo => foo.subscribe(snapshot => {
              this.courselistCount = snapshot.length;
            }));             
         
        } else {
          this.currentUser = null; // important cause mainmenu is based on this value
        }
      });  
  }

  signout() : void {
    this.authService.signout();
  }

}
