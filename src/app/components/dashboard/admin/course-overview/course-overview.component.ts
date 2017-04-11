import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';
import { Location } from '@angular/common';
import { 
  ActivatedRoute, 
  Params, 
  Router
} from '@angular/router';
import { 
  AngularFire, 
  FirebaseObjectObservable, 
  FirebaseListObservable 
} from 'angularfire2';

// Custom components
import { CourseService } from './../../../../services/course.service';
import { AuthService } from './../../../../services/auth.service';

@Component({
  selector: 'app-course-overview',
  templateUrl: './course-overview.component.html',
  styleUrls: ['./course-overview.component.less']
})
export class CourseOverviewAdminComponent implements OnInit {

  course : any;
  sectionActive : any;
  videoUrl : any;
  lectures : FirebaseListObservable<any[]>;
  sectionFormActive : boolean = false;
  lectureFormActive : boolean = false;
  editID : string = '';

  lectureKey;
  courseKey;

  currentUser;

  constructor(
    private route : ActivatedRoute,
    private courseService : CourseService, 
    private af : AngularFire,
    private sanitizer : DomSanitizer,
    private authService : AuthService,
    private location : Location
  ) {
    this.af.auth.subscribe(
      auth => {

        // if auth is set but no local object then fetch the data 
        if(auth) {
          this.authService.getCurrentUser(auth.uid)
            .then(foo => foo.subscribe(user => {
              this.currentUser = user;
            }));
          // this.currentUser = this.authService.getCurrentUser(auth.uid);
        }
      }
    );
  }

  ngOnInit() {
    this.route.params.
      switchMap((params : Params) => 
        this.courseService.getCourseByKey(params['key'])).
          subscribe(foo => {
            foo.subscribe(course => {
              this.course = course;

              this.courseService.getCourseExtras(this.course.$key, this.currentUser.$key)
                .then(foo => foo.subscribe(extras => {
                  this.course.extras = extras;
                }));

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

  show(section) {
    console.log("called!");
    this.editID = ""; // remove edit label

    this.sectionFormActive = false;
    this.sectionActive = section;
    let dangerousVideoUrl = 'https://www.youtube.com/embed/' + section.videoId;
    this.videoUrl = this.sanitizeUrl(dangerousVideoUrl);
  }

  sanitizeUrl(videoURL : string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(videoURL);
  }

  displayFormSection(lectureKey) {
    this.editID = ""; // hide edit fields 

    this.lectureKey = lectureKey;
    this.sectionActive = null; 
    this.lectureFormActive = false;
    this.sectionFormActive = true;
  }

  displayFormLecture(courseKey) {
    this.editID = ""; // hide edit fields 

    this.courseKey = courseKey;
    this.sectionActive = null;
    this.sectionFormActive = false; 
    this.lectureFormActive = true; 
  }

  editLectureTitle(event, lectureKey) {
    if(event.keyCode === 13) {
      this.courseService.editLectureTitle(lectureKey, this.course.$key, event.target.value);
      this.editID = ""; 
    }
  }

  editSectionTitle(event, sectionKey, lectureKey) {
    if(event.keyCode === 13) {
      this.courseService.editSectionTitle(sectionKey, lectureKey, event.target.value);
      this.editID = ""; 
    }
  }  

  back() {
    this.location.back();
  }


}