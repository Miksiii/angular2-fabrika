import { Component, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import { AngularFire } from 'angularfire2';

// Custom components
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'fa-root',
  template: `
    <fa-header></fa-header>
      <div class="container"> 
        <div class="row">
          <router-outlet></router-outlet>
        </div>
      </div>
    <fa-footer></fa-footer>
  `,
  styles: [``]
})
export class AppComponent implements OnInit {

  constructor(
    private af : AngularFire,
    private authService : AuthService,
    private userService : UserService
  ) {}

  ngOnInit() {
    if (performance.navigation.type == 1) {
      console.info( "This page is reloaded" );

      // when page refreshes we need to renew the currentUser 
      // object that rest in authService and represent the 
      // currently active user.
  
      this.af.auth.subscribe(auth => {
        if (auth) {
          this.userService.getUserByKey(auth.uid)
            .then(foo => foo.subscribe(snapshot => {
              this.authService.currentUser = snapshot;
            }));
        }
      });

    }  
  }

}
