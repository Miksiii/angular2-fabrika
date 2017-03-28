import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { DomSanitizer} from '@angular/platform-browser';

// custom components
import { Course } from './../../course/course';
import { CourseService } from './../../course/course.service';

@Component({
  selector: 'app-course-overview',
  templateUrl: './course-overview.component.html',
  styleUrls: ['./course-overview.component.less']
})
export class CourseOverviewComponent implements OnInit {

  course : any;
  courseLectures : any[];
  section : any;
  videoUrl : any;

  constructor(
    private route : ActivatedRoute,
    private courseService : CourseService, 
    private af : AngularFire,
    private sanitizer : DomSanitizer
  ) {

  }

  ngOnInit() {
    this.route.params.
      switchMap((params : Params) => 
        this.course = this.courseService.getCourseByKey(+params['key']).
          then(course => this.course = course)).
          subscribe(course => {
            this.course = course;
            this.courseLectures = this.course.content.lectures;

            for(let i = 0; i < this.courseLectures.length; i++) {
              let tmpLecture = this.courseLectures[i];
            }
          });
  }

  show(section) : void {
    this.section = section;
    this.videoUrl = this.sanitizeUrl(this.section.video);
  }

  sanitizeUrl(videoURL : string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(videoURL);
  }

}