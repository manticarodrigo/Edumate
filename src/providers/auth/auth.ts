import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthProvider {
  public token: any;
  public currentUser: any;
	api = 'https://edumate-server.herokuapp.com/api';
  constructor(public http: Http,
              public storage: Storage) {
    this.api = '/api';
  }

  checkAuthentication() {
    return new Promise((resolve, reject) => {
      // Load token if exists
      this.storage.get('data')
      .then(value => {
        if (value) {
          this.token = value.token;
          this.currentUser = value.user;
        }
        let headers = new Headers();
        headers.append('Authorization', this.token);
        this.http.get(this.api + '/auth/protected', {headers: headers})
        .subscribe(res => {
          console.log(res);
          resolve(res);
        }, (err) => {
          reject(err);
        });
      });
    });
  }

  setCurrentUser(user) {
    this.currentUser = user;
    var data = {
      token: this.token,
      user: user
    }
    this.storage.set('data', data);
  }
 
  createAccount(details) {
		return new Promise((resolve, reject) => {
			let headers = new Headers();
			headers.append('Content-Type', 'application/json');
			this.http.post(this.api + '/auth/register', JSON.stringify(details), {headers: headers})
      .subscribe(res => {
        let data = res.json();
        this.storage.set('data', data);
        this.token = data.token;
        this.currentUser = data.user;
        resolve(data);
      }, (err) => {
        reject(err);
      });
		});
  }
 
  login(credentials) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post(this.api + '/auth/login', JSON.stringify(credentials), {headers: headers})
      .subscribe(res => {
        let data = res.json();
        this.storage.set('data', data);
        this.token = data.token;
        this.currentUser = data.user;
        resolve(data);
      }, (err) => {
        reject(err);
      });
    });
  }
 
  logout() {
    this.token = null;
    this.currentUser = null;
    return this.storage.clear();
  }
}