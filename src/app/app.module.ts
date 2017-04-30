import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Edumate } from './app.component';

import { SocketService } from '../providers/socket-service';

import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    Edumate,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(Edumate, {
      mode: 'md',
      activator: 'none'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    Edumate,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SocketService
  ]
})
export class AppModule {}
