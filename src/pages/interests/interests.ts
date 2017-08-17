import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { InterestsProvider } from '../../providers/interests/interests';

@IonicPage({
  name: 'interests'
})
@Component({
  selector: 'page-interests',
  templateUrl: 'interests.html',
})
export class InterestsPage {
  interests: any;
  showSubLevel = null;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public interestsProvider: InterestsProvider) {
    this.interestsProvider.getInterests()
    .subscribe(response => {
        this.interests = response;
        console.log(this.interests);
    });
  }

  toggleSubLevel(idx) {
    if (this.isSubLevelShown(idx)) {
      this.showSubLevel = null;
    } else {
      this.showSubLevel = idx;
    }
  }

  isSubLevelShown(idx) {
    return this.showSubLevel === idx;
  }

}
