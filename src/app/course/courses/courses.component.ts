import { Component, OnInit, Input } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'fa-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.less']
})
export class CoursesComponent {

  courses : FirebaseListObservable<any[]>;

  constructor(af : AngularFire) {
    this.courses = af.database.list('/courses');
  }

}
