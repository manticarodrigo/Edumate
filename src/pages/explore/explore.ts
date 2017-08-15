import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController,
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

  openPost(post) {

  }

  optionsPressed() {
    
  }

}