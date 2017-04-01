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
import { AppComponent } from './app.component';
import { CoursesComponent } from './course/courses/courses.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CourseDetailComponent } from './course/course-detail/course-detail.component';
import { SignUpComponent } from './signup/signup.component';
import { SignInComponent } from './signin/signin.component';
import { CourseService} from './course/course.service';
import { AuthService } from './other/auth.service';
import { AuthGuard } from './other/auth-guard.service';
import { ShoppingCartService } from './other/shopping-cart.service';

import { AppRoutingModule } from './app-routing.module';
import { CourseCardComponent } from './course/course-card/course-card.component';
import { DashboardMainComponent } from './dashboard/dashboard-main/dashboard-main.component';
import { CourseOverviewComponent } from './dashboard/course-overview/course-overview.component';
import { CourseCreateComponent } from './course/course-create/course-create.component';
import { FormLectureComponent } from './dashboard/course-overview/form-lecture/form-lecture.component';
import { FormSectionComponent } from './dashboard/course-overview/form-section/form-section.component';
import { FormCommentComponent } from './dashboard/course-overview/form-comment/form-comment.component';

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
