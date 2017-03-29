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
  sectionActive : any;
  videoUrl : any;
  lectures : FirebaseListObservable<any[]>;
  isFormLectureVisible : boolean = false;

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

                    for(let i = 0; i < this.course.lectures.length; i++){
                      this.courseService.getSectionsByLectureKey(this.course.lectures[i].$key)
                        .then(foo => foo.subscribe(sections => {
                          this.course.lectures[i].sections = sections;
                        }))
                    }
                    })
                });
            })
          });
  }

  show(section) : void {
    this.sectionActive = section;
    this.videoUrl = this.sanitizeUrl(this.sectionActive.video);
  }

  sanitizeUrl(videoURL : string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(videoURL);
  }

}