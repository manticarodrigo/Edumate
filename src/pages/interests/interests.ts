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
      console.log(response);
      this.interests = response;
    });
    this.interestsProvider.getInterests()
    .subscribe(response => {
      console.log(response);
      for (var i = 0; i < response.length; i++) {
        let interest = response[i];
        this.findTopLevel(interest);
      }
    });
  }

  findTopLevel(interest) {
    for (var i = 0; i < this.interests.length; i++) {
      const node = this.interests[i];
      var path: String;
      if (interest.path) {
        // Remove off commas at string endpoints
        path = interest.path.slice(1, -1);
      }
      // Add path strings
      var pathArr: any;
      if (path && path.split(',').length == 1) {
        pathArr = [path];
      } else if (path) {
        pathArr = path.split(',');
      }
      if (interest.name == node.name) {
        node.checked = true;
        break;
      } else if (pathArr && node.name == pathArr[0]) {
        this.findSecondLevel(interest, node, pathArr);
        break;
      }
    }
  }

  findSecondLevel(interest, node, pathArr) {
    for (var i = 0; i < node.subs.length; i++) {
      const subNode = node.subs[i];
      if (interest.name == subNode.name) {
        subNode.checked = true;
        break;
      } else if (subNode.name == pathArr[1]) {
        this.findThirdLevel(interest, subNode, pathArr);
        break;
      }
    }
  }

  findThirdLevel(interest, node, pathArr) {
    for (var i = 0; i < node.subs.length; i++) {
      const subNode = node.subs[i];
      if (interest.name == subNode.name) {
        subNode.checked = true;
        break;
      }
    }
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
    const node = this.interests[i];
    node.checked = !node.checked;
    let interest = {
      name: node.name,
      path: null,
      user_id: this.authProvider.currentUser._id
    }
    if (node.checked) {
      this.interestsProvider.submitInterest(interest);
    } else {
      this.interestsProvider.removeInterest(interest.name);
    }
  }

  checkedSubNode(i, i2) {
    var node = this.interests[i].subs[i2];
    node.checked = !node.checked;
    let interest = {
      name: node.name,
      path: ',' + this.interests[i].name + ',',
      user_id: this.authProvider.currentUser._id
    }
    if (node.checked) {
      this.interestsProvider.submitInterest(interest);
    } else {
      this.interestsProvider.removeInterest(interest.name);
    }
  }

  checkedSubSubNode(i, i2, i3) {
    const node = this.interests[i].subs[i2].subs[i3];
    node.checked = !node.checked;
    let interest = {
      name: node.name,
      path: ',' + this.interests[i].name + ',' + this.interests[i].subs[i2].name + ',',
      user_id: this.authProvider.currentUser._id
    }
    if (node.checked) {
      this.interestsProvider.submitInterest(interest);
    } else {
      this.interestsProvider.removeInterest(interest.name);
    }
  }

}
