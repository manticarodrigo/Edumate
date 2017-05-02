import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Edumate } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { SocketService } from '../providers/socket-service';

import { TabsPage } from '../pages/tabs/tabs';

import { IonicStorageModule } from '@ionic/storage';

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
    }),
    IonicStorageModule.forRoot()
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
