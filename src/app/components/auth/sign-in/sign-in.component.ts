import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire } from 'angularfire2';
import 'rxjs/add/operator/take';

// Custom components
import { AuthService } from './../../../services/auth.service';

@Component({
  selector: 'fa-signin',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.less']
})
export class SignInComponent implements OnInit {

  user = {
    email: '',
    password: ''
  };

  constructor(
    private authService : AuthService,
    private router : Router,
    private af : AngularFire
  ) { 
    this.af.auth.subscribe(
      auth => {
        if (auth) {
          //this.router.navigateByUrl('/dashboard/main');
        }
      }
    );
  }

  ngOnInit() {
  }

  signin() {
    this.authService.login(
      this.user.email,
      this.user.password
    );
  }

}
