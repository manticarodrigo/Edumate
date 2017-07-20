import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { AuthProvider } from '../auth/auth';

@Injectable()
export class TaskProvider {

  constructor(public http: Http,
              public authProvider: AuthProvider) {
    
  }

  getTasks() {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Authorization', this.authProvider.token);
      this.http.get(this.authProvider.api + '/task', {headers: headers})
      .map(res => res.json())
      .subscribe(data => {
        resolve(data);
      }, (err) => {
        reject(err);
      });
    });
  }
 
  createTask(task) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', this.authProvider.token);
      this.http.post(this.authProvider.api + '/task', JSON.stringify(task), {headers: headers})
      .map(res => res.json())
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }
 
  deleteTask(task_id) {
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Authorization', this.authProvider.token);
        this.http.delete(this.authProvider.api + '/task/' + task_id, {headers: headers})
        .subscribe(res => {
            resolve(res);
        }, (err) => {
            reject(err);
        });    
    });
  }

}