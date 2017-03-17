import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { CoursesComponent } from './course/courses/courses.component';
import { SignInComponent } from './signin/signin.component';
import { SignUpComponent } from './signup/signup.component';

export const ROUTES = [
  {
    path: 'courses',
    component: CoursesComponent
  },
  {
    path: 'signin',
    component: SignInComponent
  },
  {
    path: 'signup',
    component: SignUpComponent
  }  
];

@NgModule({
  imports: [ RouterModule.forRoot(ROUTES)], 
  exports: [ RouterModule ]
})

export class AppRoutingModule {

}