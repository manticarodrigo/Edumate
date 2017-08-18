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
  showLevel1 = null;
  showLevel2 = null;
  interestsMap = [];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public interestsProvider: InterestsProvider) {
    this.interestsProvider.getFields()
    .subscribe(response => {
        this.interests = response;
        console.log(this.interests);
    });
  }

  toggleLevel1(idx) {
    if (this.isLevel1Shown(idx)) {
      this.showLevel1 = null;
    } else {
      this.showLevel1 = idx;
    }
  }

  toggleLevel2(idx) {
    if (this.isLevel2Shown(idx)) {
      this.showLevel2 = null;
    } else {
      this.showLevel2 = idx;
    }
  }

  isLevel1Shown(idx) {
    return this.showLevel1 === idx;
  }
  
  isLevel2Shown(idx) {
    return this.showLevel2 === idx;
  }

  checkedNode(i) {
    this.interests[i].checked = !this.interests[i].checked;
    let interest = {
      name: this.interests[i].name,
      path: null
    }
  }

  checkedSubNode(i, i2) {
    this.interests[i].subs[i2].checked = !this.interests[i].subs[i2].checked;
    let interest = {
      name: this.interests[i].subs[i2].name,
      path: ',' + this.interests[i].name + ','
    }
  }

  checkedSubSubNode(i, i2, i3) {
    this.interests[i].subs[i2].subs[i3].checked = !this.interests[i].subs[i2].subs[i3].checked;
    let interest = {
      name: this.interests[i].subs[i2].subs[i3].name,
      path: ',' + this.interests[i].name + ',' + this.interests[i].subs[i2].name + ','
    }
  }

}
