import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule }  from '@angular/router';
import { AngularFireModule } from 'angularfire2';

export const firebaseConfig = {
  apiKey: "AIzaSyC2aulT905Qn01-N2uTkCHZ5bvYuJhIO3Q",
  authDomain: "fabrikars-79b3a.firebaseapp.com",
  databaseURL: "https://fabrikars-79b3a.firebaseio.com",
  storageBucket: "fabrikars-79b3a.appspot.com",
  messagingSenderId: "522725511461"
};

// Services 
import { CourseService} from './services/course.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';

// Components/Includes 
import { HeaderComponent } from './components/includes/header/header.component';
import { FooterComponent } from './components/includes/footer/footer.component';

// Components/Auth 
import { SignInComponent } from './components/auth/sign-in/sign-in.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';

// Components/Courses
import { CoursesComponent } from './components/courses/courses.component';
import { CourseDetailComponent } from './components/courses/course-detail/course-detail.component';
import { CourseCardComponent } from './components/courses/course-card/course-card.component';

// Components/Dashboard/User
import { DashboardMainUserComponent } from './components/dashboard/user/main/main-user.component';
import { WishlistComponent } from './components/dashboard/user/wishlist/wishlist.component';
import { CourseOverviewUserComponent } from './components/dashboard/user/course-overview/course-overview.component';

// Components/Dashboard/Admin
import { DashboardMainAdminComponent } from './components/dashboard/admin/main/main-admin.component';
import { CourseCreateComponent } from './components/dashboard/admin/course-create/course-create.component';
import { CourseOverviewAdminComponent } from './components/dashboard/admin/course-overview/course-overview.component';

import { FormLectureComponent } from './dashboard/course-overview/form-lecture/form-lecture.component';
import { FormSectionComponent } from './dashboard/course-overview/form-section/form-section.component';
import { FormCommentComponent } from './dashboard/course-overview/form-comment/form-comment.component';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SubSetPipe } from './pipes/subset-pipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    HeaderComponent,
    FooterComponent,
    CourseDetailComponent,
    SignUpComponent,
    SignInComponent,
    CourseCardComponent,
    DashboardMainUserComponent,
    DashboardMainAdminComponent,
    CourseOverviewUserComponent,
    CourseOverviewAdminComponent,
    CourseCreateComponent,
    FormLectureComponent,
    FormSectionComponent,
    FormCommentComponent,
    WishlistComponent,
    SubSetPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule, 
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [
    CourseService, 
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
