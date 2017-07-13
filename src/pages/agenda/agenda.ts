import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';
import { AgendaProvider } from '../../providers/agenda/agenda';

@IonicPage({
  name: 'agenda'
})
@Component({
  selector: 'page-agenda',
  templateUrl: 'agenda.html',
})
export class AgendaPage {

  viewMode = 'all';
  entries: any;
  loading: any;
  
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public authProvider: AuthProvider,
              public agendaProvider: AgendaProvider) {
  }

  ionViewDidLoad() {
    this.agendaProvider.getEntries()
    .then((data) => {
      this.entries = data;
    }, (err) => {
      console.log("not allowed");
    });
  }
 
  addEntry() {
    let prompt = this.alertCtrl.create({
      title: 'Add Entry',
      message: 'Describe your entry below:',
      inputs: [
        {
          name: 'title'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: (entry) => {
            if (entry) {
              this.showLoader();
              this.agendaProvider.createEntry(entry)
              .then(result => {
                this.loading.dismiss();
                this.entries = result;
                console.log("todo created");
              }, (err) => {
                this.loading.dismiss();
                console.log("not allowed");
              });
            }
          }
        }
      ]
    });
 
    prompt.present();
 
  }
 
  deleteEntry(entry) {
    this.showLoader();
    //Remove from database
    this.agendaProvider.deleteEntry(entry._id).then(result => {
      this.loading.dismiss();
      //Remove locally
      let index = this.entries.indexOf(entry);
      if (index > -1) {
        this.entries.splice(index, 1);
      }
    }, (err) => {
      this.loading.dismiss();
      console.log("not allowed");
    });
  }
 
  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

}
