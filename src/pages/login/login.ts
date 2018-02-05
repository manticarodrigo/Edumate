import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController, AlertController } from 'ionic-angular';

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
  username: string;
  firstName: string;
  lastName: string;
  loading: any;
  authMode = 'login';
  shouldShowSplitPane = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              public events: Events,
              public authProvider: AuthProvider) {
  }

  ionViewDidLoad() {
    // this.showLoader();
    // Check if already authenticated
    // this.authProvider.checkAuthentication()
    // .then(res => {
    //   console.log("Already authorized - login");
    //   this.loading.dismiss();
    //   this.events.publish('user:login');
    // }, (err) => {
    //   console.log("Not already authorized - login");
    //   this.loading.dismiss();
    // });
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
      password: this.password,
      username: this.username,
      firstName: this.firstName,
      lastName: this.lastName
    };
    this.authProvider.createAccount(details)
    .then(result => {
      this.loading.dismiss();
      console.log(result);
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