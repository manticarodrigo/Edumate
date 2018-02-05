import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InstructorDetailPage } from './instructor-detail';

@NgModule({
  declarations: [
    InstructorDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(InstructorDetailPage),
  ],
})
export class InstructorDetailPageModule {}
