import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';

@IonicPage({
  name: 'task'
})
@Component({
  selector: 'page-task',
  templateUrl: 'task.html',
})
export class TaskPage {

  task = {
    name: '',
    description: '',
    type: 'reminder',
    course_id: '',
    startDate: null,
    endDate: null,
    user_id: null
  };

  startDate = null;
  endDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString();

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public authProvider: AuthProvider) {
    this.task.user_id = this.authProvider.currentUser._id;
    let task = this.navParams.get('task');
    if (task) {
      this.task = task;
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  save() {
    if (this.startDate) {
      this.task.startDate = Date.parse(this.startDate);
    }
    if (this.endDate) {
      this.task.endDate = Date.parse(this.endDate);
    }
    this.viewCtrl.dismiss(this.task);
  }

}