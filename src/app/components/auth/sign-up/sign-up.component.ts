import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire } from 'angularfire2';

// Custom components
import { AuthService } from './../../../services/auth.service';

@Component({
  selector: 'fa-signup',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.less']
})

export class SignUpComponent implements OnInit {

  user = {
    email: '',
    password: ''
  };

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
  }

  onSignUp() {
    this.authService.createUser(
      this.user.email, this.user.password
    );
  }

}
