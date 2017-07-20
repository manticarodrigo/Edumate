import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { AuthProvider } from '../auth/auth';

@Injectable()
export class UserProvider {

  constructor(public http: Http,
              public authProvider: AuthProvider) {
  }

  updateUser(user) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Authorization', this.authProvider.token);
      const endpoint = this.authProvider.api + "/user";
      this.http.post(endpoint, user, {headers})
      .map(res => res.json())
      .subscribe(data => {
        resolve(data);
      });
    });
  }

  uploadImage(file, _id) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Authorization', this.authProvider.token);
      headers.append("enctype", "multipart/form-data");
      const endpoint = this.authProvider.api + "/user/image";
      var formData = new FormData();
      formData.append('file', file);
      formData.append('_id', _id);
      this.http.post(endpoint, formData, {headers})
      .map(res => res.json())
      .subscribe(data => {
        resolve(data);
      });
    });
  }

}
