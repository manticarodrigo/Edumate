import { Component } from '@angular/core';

import { SocketService } from '../../providers/socket-service';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = 'Search';
  tab2Root = 'Contacts';
  tab3Root = 'Courses';
  tab4Root = 'Agenda';
  tab5Root = 'Profile';

  constructor(private socketS: SocketService) {
    this.socketS.initialize();
  }
}