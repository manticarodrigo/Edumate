import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { AuthProvider } from '../auth/auth';

@Injectable()
export class PostProvider {

  constructor(public http: Http,
              public authProvider: AuthProvider) {
  }

  getPosts() {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Authorization', this.authProvider.token);
      this.http.get(this.authProvider.api + '/post/' + this.authProvider.currentUser._id, {headers: headers})
      .map(res => res.json())
      .subscribe(data => {
        resolve(data);
      }, (err) => {
        reject(err);
      });
    });
  }
 
  createPost(post) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', this.authProvider.token);
      this.http.post(this.authProvider.api + '/post', JSON.stringify(post), {headers: headers})
      .map(res => res.json())
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }
 
  deletePost(post_id) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Authorization', this.authProvider.token);
      this.http.delete(this.authProvider.api + '/post/' + post_id, {headers: headers})
      .subscribe(res => {
          resolve(res);
      }, (err) => {
          reject(err);
      });
    });
  }

}
