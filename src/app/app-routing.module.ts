import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

// Custom components
import { SignInComponent } from './components/auth/sign-in/sign-in.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { CoursesComponent } from './components/courses/courses.component';
import { CourseDetailComponent } from './components/courses/course-detail/course-detail.component';
import { CourseCardComponent } from './components/courses/course-card/course-card.component';
import { DashboardMainComponent } from './components/dashboard/user/dashboard-main/dashboard-main.component';
import { CourseOverviewComponent } from './components/dashboard/user/course-overview/course-overview.component';

import { AuthGuard } from './services/auth-guard.service';
import { CourseCreateComponent } from './course/course-create/course-create.component';

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
    canActivate: [AuthGuard]
  },  
  {
    path: 'create/course',
    component: CourseCreateComponent
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