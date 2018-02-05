import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, List, ModalController, ViewController, ActionSheet, ActionSheetController, ActionSheetOptions, Config } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { AuthProvider } from '../../providers/auth/auth';

import { ConferenceData } from '../../providers/conference-data';

@IonicPage({
  name: 'courses'
})
@Component({
  selector: 'page-courses',
  templateUrl: 'courses.html',
})
export class CoursesPage {
  @ViewChild('courseList', { read: List }) scheduleList: List;

  queryText = '';
  shownCourses: any = [];
  actionSheet: ActionSheet;
  groups: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    public authProvider: AuthProvider,
    public actionSheetCtrl: ActionSheetController,
    public confData: ConferenceData,
    public config: Config,
    public inAppBrowser: InAppBrowser
  ) {}

  ionViewDidLoad() {
    this.updateSchedule();
  }

  updateSchedule() {
    // Close any open sliding items when the schedule updates
    this.scheduleList && this.scheduleList.closeSlidingItems();

    this.confData.getTimeline(0, this.queryText).subscribe((data: any) => {
      this.shownCourses = data.shownCourses;
      this.groups = data.groups;
    });
  }

  goToCourseDetail(course: any) {
    // go to the course detail page
    // and pass in the course data

    let modal = this.modalCtrl.create('course-detail', {course: course});
    modal.present();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
