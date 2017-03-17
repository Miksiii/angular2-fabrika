import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'fa-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.less']
})
export class CourseCardComponent implements OnInit {

  @Input()
  course : any;

  constructor() { }

  ngOnInit() {
    
  }

  getCourseFriendlyURL() : void {
    return this.course.title.replace(/ /g, "-");
  }

}
