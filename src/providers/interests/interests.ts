import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class InterestsProvider {

  constructor(public http: Http) {
    
  }

  getInterests() {
    return this.http.get('assets/data/interests.json')
     .map((response:Response)=>response.json());
  }

}
