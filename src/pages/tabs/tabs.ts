import { Component } from '@angular/core';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = 'explore';
  tab3Root = 'courses';
  tab4Root = 'agenda';

  constructor() {
  }
}