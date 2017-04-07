import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLectureComponent } from './form-lecture.component';

describe('FormLectureComponent', () => {
  let component: FormLectureComponent;
  let fixture: ComponentFixture<FormLectureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormLectureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormLectureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
