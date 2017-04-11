import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';

// Custom components
import { CourseService } from './course.service';

@Injectable()
export class LocalStorageService {

  wishList : any[];
  localStorageItem : string;

  constructor(private courseService : CourseService) {
    this.localStorageItem = "a2fabrika_wishlist";

    if ( JSON.parse(localStorage.getItem(this.localStorageItem)) !== null) {
      this.wishList = JSON.parse(localStorage.getItem(this.localStorageItem));
    } else {
      this.wishList = [];
    }
  }

  temporarySave(courseKey) {
    let listCopy = [];

    if ( this.wishList !== null ) {

      // if item already exists on localStorage, do nothing
      if (this.wishList.filter(course => course.$key === courseKey).length > 0) {
        return;
      }

      listCopy = this.wishList;
    }  

    listCopy.push({"$key": courseKey});
    localStorage.setItem(this.localStorageItem, JSON.stringify(listCopy));   
    this.wishList = listCopy;
  }

  onUserLoginSave(userKey : string) {
    if(this.coursesLength() > 0) {
      
      for(let i = 0; i < this.wishList.length; i++) {
        this.courseService.addCourseToWishList(userKey, this.wishList[i].$key);
      }

      this.destroy();
    }       
  }

  destroy() {
    localStorage.removeItem(this.localStorageItem);
  }

  coursesLength() : number {
    return this.wishList.length;
  }

}
