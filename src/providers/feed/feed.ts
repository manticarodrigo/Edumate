import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { AuthProvider } from '../auth/auth';

@Injectable()
export class FeedProvider {

  constructor(public http: Http,
              public authProvider: AuthProvider) {
    
  }

  getPosts() {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Authorization', this.authProvider.token);
      this.http.get(this.authProvider.api + '/feed/' + 'mathematics', {headers: headers})
      .map(res => res.json())
      .subscribe(data => {
        resolve(data);
      }, (err) => {
        reject(err);
      });
    });
  }

}
