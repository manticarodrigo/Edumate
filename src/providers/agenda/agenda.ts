import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { AuthProvider } from '../auth/auth';

@Injectable()
export class AgendaProvider {

  constructor(public http: Http,
              public authProvider: AuthProvider) {
    
  }

  getEntries() {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Authorization', this.authProvider.token);
      this.http.get(this.authProvider.api + '/entries', {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }
 
  createEntry(entry) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', this.authProvider.token);
      this.http.post(this.authProvider.api + '/entries', JSON.stringify(entry), {headers: headers})
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
 
  deleteEntry(id) {
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Authorization', this.authProvider.token);
        this.http.delete(this.authProvider.api + '/entries/' + id, {headers: headers}).subscribe((res) => {
            resolve(res);
        }, (err) => {
            reject(err);
        });    
    });
  }

}