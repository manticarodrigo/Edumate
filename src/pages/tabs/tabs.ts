import { Component } from '@angular/core';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = 'Search';
  tab2Root = 'Contacts';
  tab3Root = 'Courses';
  tab4Root = 'Agenda';
  tab5Root = 'Profile';

  constructor() {
  }
}