import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, ActionSheet, ActionSheetController, ActionSheetOptions, Config } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { AuthProvider } from '../../providers/auth/auth';

import { ConferenceData } from '../../providers/conference-data';

// TODO remove
export interface ActionSheetButton {
  text?: string;
  role?: string;
  icon?: string;
  cssClass?: string;
  handler?: () => boolean|void;
};

@IonicPage({
  name: 'instructors'
})
@Component({
  selector: 'page-instructors',
  templateUrl: 'instructors.html',
})
export class InstructorsPage {
  actionSheet: ActionSheet;
  instructors: any[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    public authProvider: AuthProvider,
    public actionSheetCtrl: ActionSheetController,
    public confData: ConferenceData,
    public config: Config,
    public inAppBrowser: InAppBrowser
  ) {}
          
  ionViewDidLoad() {
    this.confData.getInstructors().subscribe((instructors: any[]) => {
      this.instructors = instructors;
    });
  }

  goToCourseDetail(course: any) {
    let modal = this.modalCtrl.create('course-detail', { courseId: course.id });
    modal.present();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  goToInstructorTwitter(instructor: any) {
    this.inAppBrowser.create(
      `https://twitter.com/${instructor.twitter}`,
      '_blank'
    );
  }

  openInstructorShare(instructor: any) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Share ' + instructor.name,
      buttons: [
        {
          text: 'Copy Link',
          handler: () => {
            console.log('Copy link clicked on https://twitter.com/' + instructor.twitter);
            if ( (window as any)['cordova'] && (window as any)['cordova'].plugins.clipboard) {
              (window as any)['cordova'].plugins.clipboard.copy(
                'https://twitter.com/' + instructor.twitter
              );
            }
          }
        } as ActionSheetButton,
        {
          text: 'Share via ...'
        } as ActionSheetButton,
        {
          text: 'Cancel',
          role: 'cancel'
        } as ActionSheetButton
      ]
    } as ActionSheetOptions);

    actionSheet.present();
  }

  openContact(instructor: any) {
    let mode = this.config.get('mode');

    let actionSheet = this.actionSheetCtrl.create({
      title: 'Contact ' + instructor.name,
      buttons: [
        {
          text: `Email ( ${instructor.email} )`,
          icon: mode !== 'ios' ? 'mail' : null,
          handler: () => {
            window.open('mailto:' + instructor.email);
          }
        } as ActionSheetButton,
        {
          text: `Call ( ${instructor.phone} )`,
          icon: mode !== 'ios' ? 'call' : null,
          handler: () => {
            window.open('tel:' + instructor.phone);
          }
        } as ActionSheetButton
      ]
    } as ActionSheetOptions);

    actionSheet.present();
  }

}
