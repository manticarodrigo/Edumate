import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Edumate } from './app.component';

import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

import { AuthProvider } from '../providers/auth/auth';
import { SocketProvider } from '../providers/socket/socket';
import { AgendaProvider } from '../providers/agenda/agenda';

@NgModule({
  declarations: [
    Edumate,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
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
    AuthProvider,
    SocketProvider,
    AgendaProvider,
  ]
})
export class AppModule {}
