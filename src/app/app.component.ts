import { Component } from '@angular/core';
import { CoursesComponent } from './course/courses/courses.component';
import { Router } from '@angular/router';

@Component({
  selector: 'fa-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] 
})
export class AppComponent {
  title = 'app works!';
}
