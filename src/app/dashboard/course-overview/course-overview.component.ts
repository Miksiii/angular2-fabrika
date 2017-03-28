import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
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
  section : any;
  videoUrl : any;
  lectureTitle : string;
  lectures : FirebaseListObservable<any[]>;

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
        this.courseService.getCourseByKey(params['key'])).
          subscribe(foo => {
            foo.subscribe(course => {
              this.course = course;
              this.courseService.getLecturesByCourseKey(course.$key)
                                      .then(foo => {
                                        foo.subscribe(lectures => {
                                          this.course.lectures = lectures;
                                          })
                                      });
            })
          });

        //this.af.database.list(`lectures/${course.$key}`);
         //     console.log(this.lectures);

    this.lectureTitle = '';          
  }

  show(section) : void {
    this.section = section;
    this.videoUrl = this.sanitizeUrl(this.section.video);
  }

  createLecture() {
    this.courseService.createLecture(this.course.$key, this.lectureTitle);
    this.lectureTitle = '';
  }  

  sanitizeUrl(videoURL : string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(videoURL);
  }

}