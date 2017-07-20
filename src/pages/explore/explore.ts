import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';

@IonicPage({
  name: 'explore'
})
@Component({
  selector: 'page-explore',
  templateUrl: 'explore.html',
})
export class ExplorePage {

  user: any;

  constructor(public navCtrl: NavController,
              public authProvider: AuthProvider) {
    
  }

  optionsPressed() {
    
  }

}