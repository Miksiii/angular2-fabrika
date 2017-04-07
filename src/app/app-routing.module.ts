import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

// Custom components
import { SignInComponent } from './components/auth/sign-in/sign-in.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { CoursesComponent } from './components/courses/courses.component';
import { CourseDetailComponent } from './components/courses/course-detail/course-detail.component';
import { CourseCardComponent } from './components/courses/course-card/course-card.component';
import { DashboardMainUserComponent } from './components/dashboard/user/main/main-user.component';
import { WishlistComponent } from './components/dashboard/user/wishlist/wishlist.component';
import { CourseOverviewUserComponent } from './components/dashboard/user/course-overview/course-overview.component';
import { CourseOverviewAdminComponent } from './components/dashboard/admin/course-overview/course-overview.component';
import { DashboardMainAdminComponent } from './components/dashboard/admin/main/main-admin.component';
import { CourseCreateComponent } from './components/dashboard/admin/course-create/course-create.component';

import { AuthGuard } from './services/auth-guard.service';

export const ROUTES = [
  {
    path: 'browse',
    component: CoursesComponent
  },
  {
    path: 'browse/course/:key',
    component: CourseDetailComponent
  },
  {
    path: 'dashboard/main',
    component: DashboardMainUserComponent, 
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/dashboard/main',
    component: DashboardMainAdminComponent, 
    canActivate: [AuthGuard]
  },  
  {
    path: 'dashboard/wishlist',
    component: WishlistComponent, 
    canActivate: [AuthGuard]
  },  
  {
    path: '',
    redirectTo: 'courses',
    pathMatch: 'full'
  },
  {
    path: 'dashboard/course/:key/overview',
    component: CourseOverviewUserComponent, 
    canActivate: [AuthGuard]
  },  
  {
    path: 'admin/dashboard/course/:key/overview',
    component: CourseOverviewAdminComponent, 
    canActivate: [AuthGuard]
  },    
  {
    path: 'admin/dashboard/course/create',
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
];

@NgModule({
  imports: [ RouterModule.forRoot(ROUTES)], 
  exports: [ RouterModule ]
})

export class AppRoutingModule {

}