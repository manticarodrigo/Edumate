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
      console.log("looking for " + interest.name + " in " + node.name + ' with path ' + pathArr);
      if (interest.name == node.name) {
        node.checked = true;
        console.log(node.name + " checked");
        break;
      } else if (pathArr && node.name == pathArr[0]) {
        this.findSecondLevel(interest, node, pathArr);
        break;
      }
    }
  }

  findSecondLevel(interest, node, pathArr) {
    console.log(interest.name + " reached second level");
    for (var i = 0; i < node.subs.length; i++) {
      const subNode = node.subs[i];
      if (interest.name == subNode.name) {
        subNode.checked = true;
        console.log(subNode.name + " checked");
        break;
      } else if (subNode.name == pathArr[1]) {
        this.findThirdLevel(interest, subNode, pathArr);
        break;
      }
    }
  }

  findThirdLevel(interest, node, pathArr) {
    console.log(interest.name + " reached third level");
    for (var i = 0; i < node.subs.length; i++) {
      const subNode = node.subs[i];
      if (interest.name == subNode.name) {
        subNode.checked = true;
        console.log(subNode.name + " checked");
        break;
      } else if (subNode.name == pathArr[2]) {
        console.log("went too far");
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
