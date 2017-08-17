import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { AuthProvider } from '../../providers/auth/auth';
import { FeedProvider } from '../../providers/feed/feed';

@IonicPage({
  name: 'explore'
})
@Component({
  selector: 'page-explore',
  templateUrl: 'explore.html',
})
export class ExplorePage {

  posts: any;
  writingPost = false;

  constructor(public navCtrl: NavController,
              public iab: InAppBrowser,
              public authProvider: AuthProvider,
              public feedProvider: FeedProvider) {
    this.feedProvider.getPosts()
    .then(posts => {
      console.log(posts);
      this.posts = posts;
    })
    .catch(err => {
      console.log(err);
    });
  }

  writePostBlurred() {
    this.writingPost = false;
  }

  writePostFocused() {
    this.writingPost = true;
  }

  openSharedPost(sharedPost) {
    console.log('opening sharedPost');
    const browser = this.iab.create(sharedPost.link, '_blank');
  }

  optionsPressed() {
    this.navCtrl.push('interests');
  }

}