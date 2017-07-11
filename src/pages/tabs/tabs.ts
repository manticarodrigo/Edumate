import { Component } from '@angular/core';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = 'search';
  tab2Root = 'contacts';
  tab3Root = 'courses';
  tab4Root = 'agenda';
  tab5Root = 'profile';

  constructor() {
  }
}