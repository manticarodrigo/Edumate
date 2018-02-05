import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';

@IonicPage({
  name: 'contacts'
})
@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html',
})
export class ContactsPage {
  contacts: [any];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authProvider: AuthProvider,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController
  ) {
    this.contacts = [this.authProvider.currentUser];
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  chatWithContact(contact) {
    let modal = this.modalCtrl.create('chat', contact);
    modal.present();
  }

}