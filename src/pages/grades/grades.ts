import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage({
  name: 'grades'
})
@Component({
  selector: 'page-grades',
  templateUrl: 'grades.html',
})
export class GradesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GradesPage');
  }

}
