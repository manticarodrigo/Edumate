import { Component } from '@angular/core';
import { IonicPage, MenuController } from 'ionic-angular';

@IonicPage({
  name: 'tabs'
})
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = 'explore';
  tab2Root = 'courses';
  tab3Root = 'instructors';
  tab4Root = 'schedule';

  constructor(public menuCtrl: MenuController) {
    this.menuCtrl.enable(true);
  }
}