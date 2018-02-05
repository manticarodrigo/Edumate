import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Edumate } from './app.component';

import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { AuthProvider } from '../providers/auth/auth';
import { UserProvider } from '../providers/user/user';
import { CourseProvider } from '../providers/course/course';
import { TaskProvider } from '../providers/task/task';
import { FeedProvider } from '../providers/feed/feed';
import { InterestsProvider } from '../providers/interests/interests';
import { PostProvider } from '../providers/post/post';

import { ConferenceData } from '../providers/conference-data';
import { UserData } from '../providers/user-data';

@NgModule({
  declarations: [
    Edumate
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(Edumate, {
      mode: 'ios',
      // iconMode: 'md',
      spinner: 'dots'
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    Edumate
  ],
  providers: [
    StatusBar,
    SplashScreen,
    InAppBrowser,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    UserProvider,
    CourseProvider,
    TaskProvider,
    FeedProvider,
    InterestsProvider,
    PostProvider,
    ConferenceData,
    UserData
  ]
})
export class AppModule {}
