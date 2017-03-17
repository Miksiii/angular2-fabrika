import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'fa-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.less']
})
export class CoursesComponent {

  @Input()
  courseName : string;

}
