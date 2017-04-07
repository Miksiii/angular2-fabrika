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
import { ShoppingCartService } from './services/shopping-cart.service';

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
import { DashboardMainComponent } from './components/dashboard/user/dashboard-main/dashboard-main.component';
import { CourseOverviewComponent } from './components/dashboard/user/course-overview/course-overview.component';

import { FormLectureComponent } from './dashboard/course-overview/form-lecture/form-lecture.component';
import { FormSectionComponent } from './dashboard/course-overview/form-section/form-section.component';
import { FormCommentComponent } from './dashboard/course-overview/form-comment/form-comment.component';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CourseCreateComponent } from './course/course-create/course-create.component';

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
    DashboardMainComponent,
    CourseOverviewComponent,
    CourseCreateComponent,
    FormLectureComponent,
    FormSectionComponent,
    FormCommentComponent
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
    AuthGuard,
    ShoppingCartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
