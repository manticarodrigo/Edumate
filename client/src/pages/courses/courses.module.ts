import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Courses } from './courses';

@NgModule({
  declarations: [
    Courses,
  ],
  imports: [
    IonicPageModule.forChild(Courses),
  ],
  exports: [
    Courses
  ]
})
export class CoursesModule {}
