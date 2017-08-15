import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

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
    type: '',
    startDate: null,
    endDate: Date.now()
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController) {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
