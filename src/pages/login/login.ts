import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';

import { AuthProvider } from '../../providers/auth/auth';

@IonicPage({
  name: 'login'
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email: string;
  password: string;
  loading: any;
  authMode = 'login';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public authProvider: AuthProvider) {
  }

  ionViewDidLoad() {
    this.showLoader();
    //Check if already authenticated
    this.authProvider.checkAuthentication().then((res) => {
      console.log("Already authorized");
      this.loading.dismiss();
      this.navCtrl.setRoot(TabsPage);
    }, (err) => {
      console.log("Not already authorized");
      this.loading.dismiss();
    });
  }
 
  login() {
    this.showLoader();
    let credentials = {
      email: this.email,
      password: this.password
    };
    this.authProvider.login(credentials).then((result) => {
      this.loading.dismiss();
      console.log(result);
      this.navCtrl.setRoot(TabsPage);
    }, (err) => {
      this.loading.dismiss();
      console.log(err);
    });

  }

  showLoader() {
    this.loading = this.loadingCtrl.create({
        content: 'Authenticating...'
    });
    this.loading.present();
  }
}