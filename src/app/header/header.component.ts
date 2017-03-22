import { Component, OnInit, Input} from '@angular/core';
import { AuthService } from './../other/auth.service';

@Component({
  selector: 'fa-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  @Input()
  authObject;

  constructor(private authService : AuthService) { 
    console.log(this.authObject);
  }

  ngOnInit() {
    
  }

  signout() : void {
    this.authService.signout();
  }

}
