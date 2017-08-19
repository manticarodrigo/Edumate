import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';
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
              public authProvider: AuthProvider,
              public interestsProvider: InterestsProvider) {
    this.interestsProvider.getFields()
    .subscribe(response => {
        this.interests = response;
        console.log(this.interests);
    });
    this.interestsProvider.getInterests()
    .subscribe(response => {
      console.log(response);
      for (var num = 0; num < response.length; num++) {
        let interest = response[num];
        if (interest.path) {
          var path: String = interest.path;
          var nodeArr = path.slice(0, 1).slice(path.length - 1, 1).split(',');
          var level = nodeArr.length;
          console.log(nodeArr);
          console.log(level);
          if (level == 2) {
            for (var i = 0; i < this.interests.length; i++) {
              if (this.interests[i].name == nodeArr[0]) {
                for (var i2 = 0; i2 < this.interests[i].length; i++) {
                  if (this.interests[i].subs[i2].name == nodeArr[1]) {
                    for (var i3 = 0; i3 < this.interests[i].subs[i2].length; i++) {
                      if (this.interests[i].subs[i2].subs[i3].name == nodeArr[2]) {
                        this.interests[i].subs[i2].subs[i3].checked = true;
                        break;
                      }
                    }
                  }
                }
              }
            }
          } else {
            for (var i = 0; i < this.interests.length; i++) {
              if (this.interests[i].name == nodeArr[0]) {
                for (var i2 = 0; i2 < this.interests[i].length; i++) {
                  if (this.interests[i].subs[i2].name == nodeArr[1]) {
                    this.interests[i].subs[i2].checked = true;
                    break;
                  }
                }
              }
            }
          }
        } else {
          for (var i = 0; i < this.interests.length; i++) {
            if (this.interests[i].name == interest.name) {
              this.interests[i].checked = true;
              break;
            }
          }
        }
      }
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
      path: null,
      user_id: this.authProvider.currentUser._id
    }
    this.interestsProvider.submitInterest(interest);
  }

  checkedSubNode(i, i2) {
    this.interests[i].subs[i2].checked = !this.interests[i].subs[i2].checked;
    let interest = {
      name: this.interests[i].subs[i2].name,
      path: ',' + this.interests[i].name + ',',
      user_id: this.authProvider.currentUser._id
    }
    this.interestsProvider.submitInterest(interest);
  }

  checkedSubSubNode(i, i2, i3) {
    this.interests[i].subs[i2].subs[i3].checked = !this.interests[i].subs[i2].subs[i3].checked;
    let interest = {
      name: this.interests[i].subs[i2].subs[i3].name,
      path: ',' + this.interests[i].name + ',' + this.interests[i].subs[i2].name + ',',
      user_id: this.authProvider.currentUser._id
    }
    this.interestsProvider.submitInterest(interest);
  }

}
