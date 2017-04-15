import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Injectable()
export class FileUploadService {

  constructor(private router : Router) { }

  uploadCourseThumbnail(thumbnail : any, courseKey) {
    let storageRef = firebase.storage().ref();
    let path = `courses/${courseKey}/thumbnails/${thumbnail.name}`;

    storageRef.child(path)
      .put(thumbnail)
      .then((snapshot) => {
        this.router.navigate(['/admin/dashboard/course', courseKey, 'overview']);
      });
  }  

  getThumbnailDownloadableURL(course : any) : Promise<any> {
    let pathToThumbnail = `courses/${course.$key}/thumbnails/${course.thumbnail}`;
    let storageRef = firebase.storage().ref()
                      .child(pathToThumbnail);

    return Promise.resolve(storageRef.getDownloadURL());
  }  

}
