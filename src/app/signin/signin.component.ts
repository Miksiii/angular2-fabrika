import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './../other/user';
import { AuthService } from './../other/auth.service';

import { AngularFire } from 'angularfire2';


@Component({
  selector: 'fa-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.less']
})
export class SignInComponent implements OnInit {

  user : User;
  errMessage : string; 

  constructor(
    private authService : AuthService,
    private router : Router,
    private af : AngularFire
  ) { 
    this.af.auth.subscribe(
      auth => {
        if (auth) {
          this.router.navigateByUrl('/dashboard-main');
        }
      }
    );
  }

  ngOnInit() {
    this.user = new User(null, null);
  }

  onSignIn() {
    this.authService.login(
      this.user.email,
      this.user.password
    );
  }

}
