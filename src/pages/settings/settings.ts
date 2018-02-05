import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';

@IonicPage({
  name: 'settings'
})
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public authProvider: AuthProvider
  ) {}

  dismiss() {
    this.viewCtrl.dismiss();
  }

  logout() {
    this.authProvider.logout();
    this.dismiss();
  }

}
