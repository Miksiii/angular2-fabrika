import { Component, OnInit } from '@angular/core';
import { AuthService } from './../other/auth.service';

@Component({
  selector: 'fa-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  constructor(private authService : AuthService) { }

  ngOnInit() {
  }

  signout() : void {
    this.authService.signout();
  }

}
