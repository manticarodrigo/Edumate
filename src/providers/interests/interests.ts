import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { AuthProvider } from '../auth/auth';

@Injectable()
export class InterestsProvider {

  constructor(public http: Http,
              public authProvider: AuthProvider) {
    
  }

  getFields() {
    return this.http.get('assets/data/fields.json')
     .map((response:Response)=>response.json());
  }

  getDisciplines() {
    return this.http.get('assets/data/disciplines.json')
     .map((response:Response)=>response.json());
  }

  submitInterest(interest) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', this.authProvider.token);
      this.http.post(this.authProvider.api + '/interest/' + this.authProvider.currentUser._id, JSON.stringify(interest), {headers: headers})
      .map(res => res.json())
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

}