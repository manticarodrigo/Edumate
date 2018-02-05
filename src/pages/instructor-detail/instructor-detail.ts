import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ConferenceData } from '../../providers/conference-data';

@IonicPage({
  name: 'instructor-detail'
})
@Component({
  selector: 'page-instructor-detail',
  templateUrl: 'instructor-detail.html',
})
export class InstructorDetailPage {
  course: any;

  constructor(
    public dataProvider: ConferenceData,
    public navParams: NavParams
  ) {}

  ionViewWillEnter() {
    this.dataProvider.load().subscribe((data: any) => {
      if (
        data &&
        data.schedule &&
        data.schedule[0] &&
        data.schedule[0].groups
      ) {
        for (const group of data.schedule[0].groups) {
          if (group && group.courses) {
            for (const course of group.courses) {
              if (course && course.id === this.navParams.data.courseId) {
                this.course = course;
                break;
              }
            }
          }
        }
      }
    });
  }

}
