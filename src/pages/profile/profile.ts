import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';
import { UserProvider } from '../../providers/user/user';

@IonicPage({
  name: 'profile'
})
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  user: any;
  uploading = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public authProvider: AuthProvider,
              public userProvider: UserProvider) {
    this.user = {
      firstName: this.authProvider.currentUser.firstName,
      lastName: this.authProvider.currentUser.lastName,
      email: this.authProvider.currentUser.email,
      username: this.authProvider.currentUser.username,
      imageUrl: this.authProvider.currentUser.imageUrl,
      _id: this.authProvider.currentUser._id
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  fileChanged(event) {
    console.log("file changed:");
    console.log(event.target.files[0]);
    this.uploading = true;
    this.userProvider.uploadImage(event.target.files[0], this.authProvider.currentUser._id)
    .then(data => {
      console.log("profile component received data:");
      console.log(data);
      if (data['_id']) {
        this.uploading = false;
        this.user = data;
        this.authProvider.setCurrentUser(data);
      }
    });
  }

  save() {
    this.userProvider.updateUser(this.user)
    .then(data => {
      console.log("profile component recevied data:")
      console.log(data);
      if (data['_id']) {
        this.user = data;
        this.authProvider.setCurrentUser(data);
      }
      this.dismiss();
    });
  }

}