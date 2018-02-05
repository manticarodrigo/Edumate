import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InstructorsPage } from './instructors';

@NgModule({
  declarations: [
    InstructorsPage,
  ],
  imports: [
    IonicPageModule.forChild(InstructorsPage),
  ],
  exports: [
    InstructorsPage
  ]
})
export class InstructorsModule {}
