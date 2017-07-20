import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

import { AuthProvider } from '../providers/auth/auth';

@Component({
  templateUrl: 'app.html'
})
export class Edumate {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = 'loading';
  pages: any;
  helpPage = {component: 'help'};
  constructor(private platform: Platform,
              private statusBar: StatusBar,
              private splashScreen: SplashScreen,
              private modalCtrl: ModalController,
              public authProvider: AuthProvider) {
    // Sidemenu pages
    this.pages = [
      { title: 'Profile', component: 'profile', icon: 'person' },
      { title: 'Settings', component: 'settings', icon: 'settings' },
      { title: 'Contacts', component: 'contacts', icon: 'chatbubbles'},
      { title: 'Grades', component: 'grades', icon: 'checkbox-outline'}
    ];

    platform.ready()
    .then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    // Check if already authenticated
    this.authProvider.checkAuthentication()
    .then(res => {
      console.log("Already authorized");
    }, (err) => {
      console.log("Not already authorized");
      this.nav.setRoot('login');
    });
  }

  openPage(page) {
    let modal = this.modalCtrl.create(page.component);
    modal.present();
  }

  logout() {
    console.log("logout pressed");
    this.authProvider.logout()
    .then(() => {
      this.nav.setRoot('login');
    });
  }

}