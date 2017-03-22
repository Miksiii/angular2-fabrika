import { Component, OnInit, Input } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Course } from './../course';
import { CourseService} from './../course.service';

@Component({
  selector: 'fa-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.less']
})
export class CoursesComponent implements OnInit {

  courses : FirebaseListObservable<Course[]>;
  
  constructor(private courseService : CourseService) { }

  ngOnInit() {
    this.courseService.getCourses().
      then(courses => this.courses = courses);
  }

}
