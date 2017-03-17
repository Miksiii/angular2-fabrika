import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute } from '@angular/router';

@Component({
  selector: 'fa-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.less']
})
export class CourseDetailComponent implements OnInit {

  constructor(private route : ActivatedRoute) { }

  ngOnInit() {
    // this.route.params.switchMap().subscribe(course => this.course => course);
  }

}
