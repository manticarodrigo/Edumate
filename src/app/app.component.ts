import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events, ModalController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AuthProvider } from '../providers/auth/auth';

export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  index?: Number;
}

@Component({
  templateUrl: 'app.html'
})
export class Edumate {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = 'login';
  pages: PageInterface[] = [
    { title: 'Profile', name: 'ProfilePage', component: 'profile', icon: 'person' },
    { title: 'Contacts', name: 'ContactsPage', component: 'contacts', icon: 'chatbubbles'},
    { title: 'Grades', name: 'GradesPage', component: 'grades', icon: 'checkmark-circle'}
  ];
  appPages: PageInterface[] = [
    { title: 'Explore', name: 'ExplorePage', component: 'explore', index: 0, icon: 'compass' },
    { title: 'Courses', name: 'CoursesPage', component: 'courses', index: 1, icon: 'book'},
    { title: 'Instructors', name: 'InstructorsPage', component: 'instructors', index: 2, icon: 'school' },
    { title: 'Schedule', name: 'SchedulePage', component: 'schedule', index: 3, icon: 'calendar'}
  ];

  constructor(
    private platform: Platform,
    public events: Events,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private modalCtrl: ModalController,
    private menuCtrl: MenuController,
    public authProvider: AuthProvider
  ) {

    platform.ready()
    .then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleLightContent();
      splashScreen.hide();
      this.enableMenu(false);
    });

    // Check if already authenticated
    this.listenToLoginEvents();
    this.authProvider.checkAuthentication()
    .then(res => {
      console.log("Already authorized");
    }, (err) => {
      console.log("Not already authorized");
    });
  }

  listenToLoginEvents() {
    this.events.subscribe('user:reauth', () => {
      this.enableMenu(true);
      if (this.nav.getActive().id === 'loading') {
        this.nav.setRoot('explore');
      }
    });

    this.events.subscribe('user:login', () => {
      this.enableMenu(true);
      this.nav.setRoot('explore');
    });

    this.events.subscribe('user:register', () => {
      this.enableMenu(true);
      this.nav.setRoot('explore');
    });

    this.events.subscribe('user:logout', () => {
      this.enableMenu(false);
      this.nav.setRoot('login');
    });
  }

  enableMenu(loggedIn: boolean) {
    this.menuCtrl.enable(loggedIn);
  }

  isActive(page: PageInterface) {
    let childNav = this.nav.getActiveChildNavs()[0];

    if (this.nav.getActive() && this.nav.getActive().name === page.name) {
      return 'primary';
    }
    return;
  }

  openPage(page: PageInterface) {
    this.nav.setRoot(page.component);
    // let params = {};

    // // the nav component was found using @ViewChild(Nav)
    // // setRoot on the nav to remove previous pages and only have this page
    // // we wouldn't want the back button to show in this scenario
    // if (page.index) {
    //   params = { tabIndex: page.index };
    // }

    // // If we are already on tabs just change the selected tab
    // // don't setRoot again, this maintains the history stack of the
    // // tabs even if changing them from the menu
    // if (this.nav.getActiveChildNavs().length && page.index != undefined) {
    //   this.nav.getActiveChildNavs()[0].select(page.index);
    // } else {
    //   // Set the root of the nav with params if it's a tab index
    //   this.nav.setRoot(page.name, params).catch((err: any) => {
    //     console.log(`Didn't set nav root: ${err}`);
    //   });
    // }
  }

  createModal(page) {
    let modal = this.modalCtrl.create(page.component);
    modal.present();
  }

}