import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScheduleSettingsPage } from './schedule-settings';

@NgModule({
  declarations: [
    ScheduleSettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(ScheduleSettingsPage),
  ],
})
export class ScheduleSettingsPageModule {}
