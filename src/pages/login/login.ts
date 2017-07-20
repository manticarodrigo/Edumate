import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, MenuController } from 'ionic-angular';

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
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  loading: any;
  authMode = 'login';
  shouldShowSplitPane = false;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              public menuCtrl: MenuController,
              public authProvider: AuthProvider) {
  }

  ionViewDidLoad() {
    this.menuCtrl.enable(false);
    this.showLoader();
    // Check if already authenticated
    this.authProvider.checkAuthentication()
    .then(res => {
      this.loading.dismiss();
      console.log("Already authorized - login");
      this.navCtrl.setRoot(TabsPage);
    }, (err) => {
      this.loading.dismiss();
      console.log("Not already authorized - login");
    });
  }

  auth() {
    if (this.authMode == 'login') {
      this.login();
    } else {
      this.register();
    }
  }
 
  login() {
    this.showLoader();
    let credentials = {
      email: this.email,
      password: this.password
    };
    this.authProvider.login(credentials)
    .then(result => {
      this.loading.dismiss();
      console.log(result);
      this.navCtrl.setRoot(TabsPage);
    }, (err) => {
      this.loading.dismiss();
      console.log(err);
      if (err.status == 401) {
        let alert = this.alertCtrl.create({
          title: 'Login Failed',
          message: 'Your login credentials are invalid',
          buttons: ['Dismiss']
        });
        alert.present();
      }
    });
  }

  register() {
    this.showLoader();
    let details = {
      email: this.email,
      username: this.username,
      firstName: this.firstName,
      lastName: this.lastName,
      password: this.password,
      role: 'guest'
    };
    this.authProvider.createAccount(details)
    .then(result => {
      this.loading.dismiss();
      console.log(result);
      this.navCtrl.setRoot(TabsPage);
    }, (err) => {
      this.loading.dismiss();
    });
  }
  
  showLoader() {
    this.loading = this.loadingCtrl.create({
        content: 'Authenticating...'
    });
    this.loading.present();
  }
}