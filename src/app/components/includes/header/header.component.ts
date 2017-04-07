import { SimpleChange, Component, OnInit, Input} from '@angular/core';
import { AngularFire } from 'angularfire2';

// Custom components
import { AuthService } from './../../../services/auth.service';

@Component({
  selector: 'fa-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  currentUser : any = null;

  constructor(
    private authService : AuthService,
    private af : AngularFire,
  ) {
    this.af.auth.subscribe(
      isAuthenticated => {
        if(isAuthenticated) {
          this.authService.getCurrentUser(isAuthenticated.uid)
            .then(foo => foo.subscribe(user => {
              this.currentUser = user;
            }));
        } else {
           this.currentUser = null;
        }
      }
    );
  }

  ngOnInit() {
  }

  signout() : void {
    this.authService.signout(this.currentUser.uid);
  }

}
