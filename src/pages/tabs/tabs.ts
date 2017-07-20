import { Component } from '@angular/core';
import { MenuController } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = 'explore';
  tab3Root = 'courses';
  tab4Root = 'agenda';

  constructor(public menuCtrl: MenuController) {
    this.menuCtrl.enable(true);
  }
}