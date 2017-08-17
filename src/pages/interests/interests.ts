import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage({
  name: 'interests'
})
@Component({
  selector: 'page-interests',
  templateUrl: 'interests.html',
})
export class InterestsPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
  }

}
