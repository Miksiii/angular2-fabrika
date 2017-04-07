import { Component, OnInit} from '@angular/core';

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

  constructor() {}

  ngOnInit() {
  }

}
