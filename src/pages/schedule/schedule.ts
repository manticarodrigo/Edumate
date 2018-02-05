import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ItemSliding, List, ModalController, AlertController, LoadingController, FabContainer, ToastController, Refresher } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';
import { TaskProvider } from '../../providers/task/task';

import { ConferenceData } from '../../providers/conference-data';
import { UserData } from '../../providers/user-data';

@IonicPage({
  name: 'schedule'
})
@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
})
export class SchedulePage {
  // the list is a child of the schedule page
  // @ViewChild('scheduleList') gets a reference to the list
  // with the variable #scheduleList, `read: List` tells it to return
  // the List and not a reference to the element
  @ViewChild('scheduleList', { read: List }) scheduleList: List;

  segment = 'upcoming';
  tasks: any;
  loading: any;
  dayIndex = 0;
  queryText = '';
  excludeTracks: any = [];
  shownCourses: any = [];
  groups: any = [];
  confDate: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public app: App,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public confData: ConferenceData,
    public user: UserData,
    public authProvider: AuthProvider,
    public taskProvider: TaskProvider
  ) {
    this.taskProvider.getTasks()
    .then(data => {
      console.log(data);
      this.tasks = data;
    }, (err) => {
      console.log(err);
    });
  }

  ionViewDidLoad() {
    this.app.setTitle('Schedule');
    this.updateSchedule();
  }

  updateSchedule() {
    // Close any open sliding items when the schedule updates
    this.scheduleList && this.scheduleList.closeSlidingItems();

    this.confData.getTimeline(this.dayIndex, this.queryText, this.excludeTracks, this.segment).subscribe((data: any) => {
      this.shownCourses = data.shownCourses;
      this.groups = data.groups;
    });
  }

  openTask(task) {
    let modal = this.modalCtrl.create('task', {
      task: task
    });
    modal.onDidDismiss(task => {
      if (task) {
        this.showLoader();
        this.taskProvider.createTask(task)
        .then(result => {
          this.loading.dismiss();
          this.tasks = result;
        }, (err) => {
          this.loading.dismiss();
          console.log(err);
        });
      }
    });
    modal.present();
  }
 
  addTask() {
    let modal = this.modalCtrl.create('task');
    modal.onDidDismiss(task => {
      if (task) {
        this.showLoader();
        this.taskProvider.createTask(task)
        .then(result => {
          this.loading.dismiss();
          this.tasks = result;
        }, (err) => {
          this.loading.dismiss();
          console.log(err);
        });
      }
    });
    modal.present();
  }
 
  deleteTask(task) {
    this.showLoader();
    // Remove from database
    this.taskProvider.deleteTask(task._id).then(result => {
      this.loading.dismiss();
      // Remove locally
      let index = this.tasks.indexOf(task);
      if (index > -1) {
        this.tasks.splice(index, 1);
      }
    }, (err) => {
      this.loading.dismiss();
      console.log(err);
    });
  }
 
  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  presentFilter() {
    let modal = this.modalCtrl.create('schedule-settings', this.excludeTracks);
    modal.present();

    modal.onWillDismiss((data: any[]) => {
      if (data) {
        this.excludeTracks = data;
        this.updateSchedule();
      }
    });

  }

  goToCourseDetail(course: any) {
    // go to the course detail page
    // and pass in the course data
    let modal = this.modalCtrl.create('course-detail', {course: course});
    modal.present();
  }

  addFavorite(slidingItem: ItemSliding, courseData: any) {

    if (this.user.hasFavorite(courseData.name)) {
      // woops, they already favorited it! What shall we do!?
      // prompt them to remove it
      this.removeFavorite(slidingItem, courseData, 'Favorite already added');
    } else {
      // remember this course as a user favorite
      this.user.addFavorite(courseData.name);

      // create an alert instance
      let alert = this.alertCtrl.create({
        title: 'Favorite Added',
        buttons: [{
          text: 'OK',
          handler: () => {
            // close the sliding item
            slidingItem.close();
          }
        }]
      });
      // now present the alert on top of all other content
      alert.present();
    }

  }

  removeFavorite(slidingItem: ItemSliding, courseData: any, title: string) {
    let alert = this.alertCtrl.create({
      title: title,
      message: 'Would you like to remove this course from your favorites?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            // they clicked the cancel button, do not remove the course
            // close the sliding item and hide the option buttons
            slidingItem.close();
          }
        },
        {
          text: 'Remove',
          handler: () => {
            // they want to remove this course from their favorites
            this.user.removeFavorite(courseData.name);
            this.updateSchedule();

            // close the sliding item and hide the option buttons
            slidingItem.close();
          }
        }
      ]
    });
    // now present the alert on top of all other content
    alert.present();
  }

  openSocial(network: string, fab: FabContainer) {
    let loading = this.loadingCtrl.create({
      content: `Posting to ${network}`,
      duration: (Math.random() * 1000) + 500
    });
    loading.onWillDismiss(() => {
      fab.close();
    });
    loading.present();
  }

  doRefresh(refresher: Refresher) {
    this.confData.getTimeline(this.dayIndex, this.queryText, this.excludeTracks, this.segment).subscribe((data: any) => {
      this.shownCourses = data.shownCourses;
      this.groups = data.groups;

      // simulate a network request that would take longer
      // than just pulling from out local json file
      setTimeout(() => {
        refresher.complete();

        const toast = this.toastCtrl.create({
          message: 'Courses have been updated.',
          duration: 3000
        });
        toast.present();
      }, 1000);
    });
  }

}
