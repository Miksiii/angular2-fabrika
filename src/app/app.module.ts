import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule }  from '@angular/router';

import { AppComponent } from './app.component';
import { CoursesComponent } from './courses/courses.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { SignUpComponent } from './signup/signup.component';
import { SignInComponent } from './signin/signin.component';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    HeaderComponent,
    FooterComponent,
    CourseDetailComponent,
    SignUpComponent,
    SignInComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
