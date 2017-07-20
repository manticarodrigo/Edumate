import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';

import { AuthProvider } from '../../providers/auth/auth';

@IonicPage({
  name: 'loading'
})
@Component({
  selector: 'page-loading',
  templateUrl: 'loading.html',
})
export class LoadingPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public menuCtrl: MenuController,
              public authProvider: AuthProvider) {
    // Check if already authenticated
    this.authProvider.checkAuthentication()
    .then(res => {
      console.log("Already authorized - loading");
      this.navCtrl.setRoot(TabsPage);
    }, (err) => {
      console.log("Not already authorized - loading");
    });
  }

  ionViewDidLoad() {
    this.menuCtrl.enable(false);
  }

}
