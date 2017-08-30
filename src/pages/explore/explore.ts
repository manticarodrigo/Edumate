import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { AuthProvider } from '../../providers/auth/auth';
import { PostProvider } from '../../providers/post/post';

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
  polling = false;

  post = {
    _author: '',
    _poll: null,
    text: '',
    attachmentUrl: null
  }

  poll = {
    choices: [{name: ''}, {name: ''}],
    startDate: null,
    endDate: null
  }

  constructor(public navCtrl: NavController,
              public iab: InAppBrowser,
              public authProvider: AuthProvider,
              public postProvider: PostProvider) {
    this.post._author = this.authProvider.currentUser._id;
    this.postProvider.getPosts()
    .then(posts => {
      console.log(posts);
      this.posts = posts;
    })
    .catch(err => {
      console.log(err);
    });
  }

  optionsPressed() {
    this.navCtrl.push('interests');
  }

  writePostBlurred() {
    this.writingPost = false;
  }

  writePostFocused() {
    this.writingPost = true;
  }

  togglePoll() {
    this.polling = !this.polling;
  }

  openSharedPost(sharedPost) {
    const browser = this.iab.create(sharedPost.link, '_blank');
  }

  createPost() {
    console.log("creating post");
    if (this.poll.choices.length > 1) {
      this.post._poll = this.poll;
    }
    this.postProvider.createPost(this.post)
    .then(posts => {
      this.posts = posts;
      this.post = {
        _author: '',
        _poll: null,
        text: '',
        attachmentUrl: null
      }
      this.writePostBlurred();
    });
  }

}