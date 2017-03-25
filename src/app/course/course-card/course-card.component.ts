import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from './../course';

@Component({
  selector: 'fa-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.less']
})
export class CourseCardComponent implements OnInit {

  @Input()
  course : any;
  @Input()
  routeContext;

  constructor(private router : Router) { }

  ngOnInit() {
    
  }

  getCourseFriendlyURL() : string {
    return this.course.title.replace(/ /g, "-");
  }

  goToContext() {
    switch(this.routeContext) {
      case 'detail':
        this.router.navigate(['/course/', this.course.$key]);
        break;
      case 'overview':
        this.router.navigate(['/course/', this.course.$key, 'overview']);
        break;
    }
  }

}
