import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { CoursesComponent } from './course/courses/courses.component';
import { CourseDetailComponent } from './course/course-detail/course-detail.component';
import { SignInComponent } from './signin/signin.component';
import { SignUpComponent } from './signup/signup.component';

import { DashboardMainComponent } from './dashboard/dashboard-main/dashboard-main.component';

export const ROUTES = [
  {
    path: 'courses',
    component: CoursesComponent
  },
  {
    path: 'course/:key',
    component: CourseDetailComponent
  },
  {
    path: 'signin',
    component: SignInComponent
  },
  {
    path: 'signup',
    component: SignUpComponent
  },
  {
    path: 'dashboard-main',
    component: DashboardMainComponent
  }   
];

@NgModule({
  imports: [ RouterModule.forRoot(ROUTES)], 
  exports: [ RouterModule ]
})

export class AppRoutingModule {

}