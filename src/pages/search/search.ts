import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SocketService } from '../../providers/socket-service';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class Search {
  todo = '';

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private socketS: SocketService) {
  }

  saveTodo() {
    this.socketS.saveTodo(this.todo);
    this.todo = '';
  }

}
