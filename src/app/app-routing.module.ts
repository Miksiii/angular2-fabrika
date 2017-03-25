import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { AuthGuard }                from './other/auth-guard.service';

import { CoursesComponent } from './course/courses/courses.component';
import { CourseDetailComponent } from './course/course-detail/course-detail.component';
import { SignInComponent } from './signin/signin.component';
import { SignUpComponent } from './signup/signup.component';

import { DashboardMainComponent } from './dashboard/dashboard-main/dashboard-main.component';

import { CourseOverviewComponent } from './dashboard/course-overview/course-overview.component';

export const ROUTES = [
  {
    path: 'courses',
    component: CoursesComponent
  },
  {
    path: '',
    redirectTo: 'courses',
    pathMatch: 'full'
  },
  {
    path: 'course/:key',
    component: CourseDetailComponent
  },
  {
    path: 'course/:key/overview',
    component: CourseOverviewComponent, 
    //canActivate: [AuthGuard]
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
    component: DashboardMainComponent, 
    canActivate: [AuthGuard]
  }   
];

@NgModule({
  imports: [ RouterModule.forRoot(ROUTES)], 
  exports: [ RouterModule ]
})

export class AppRoutingModule {

}