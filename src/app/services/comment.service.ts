import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { 
  AngularFire, 
  FirebaseListObservable, 
  FirebaseObjectObservable, 
  AuthProviders, 
  AuthMethods 
} from 'angularfire2';

@Injectable()
export class CommentService {

  constructor(private af : AngularFire) {}

  save(courseKey, sectionKey, comment) {
    this.af.database.list(`comments/${courseKey}/${sectionKey}`).push({
      username: comment.username,
      body: comment.body,
      date: comment.date
    });    
  }

  getCourseComments(key : string) : Promise<FirebaseListObservable<any[]>> {
    return Promise.resolve(this.af.database.list(`comments/${key}`));
  }

  getCourseCommentsBySection(courseKey : string, sectionKey : string) : Promise<FirebaseListObservable<any[]>> {
    return Promise.resolve(this.af.database.list(`comments/${courseKey}/${sectionKey}`));
  }  


}
