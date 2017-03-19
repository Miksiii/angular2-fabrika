import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './../../other/user';
import { AuthService } from './../../other/auth.service';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.less']
})
export class DashboardMainComponent implements OnInit {

  constructor(
    private authService : AuthService,
    private af : AngularFire,
    private router : Router) {
    this.af.auth.subscribe(
      auth => {
        if (!auth) {
          this.router.navigateByUrl('/signin');
        }
      }
    );
  }

  ngOnInit() {
  }

}
