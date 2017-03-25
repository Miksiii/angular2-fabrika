import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './../other/user';
import { AuthService } from './../other/auth.service';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'fa-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less']
})

export class SignUpComponent implements OnInit {

  user : User;

  constructor(
    private authService : AuthService,
    private af : AngularFire,
    private router : Router) {
    this.af.auth.subscribe(
      auth => {
        //if (auth) {
        //  this.router.navigateByUrl('/dashboard-main');
        //}
      }
    );
  }

  ngOnInit() {
    this.user = new User(null, null);
  }

  onSignUp() {
    this.authService.createUser(
      this.user.email, this.user.password
    );
  }

}
