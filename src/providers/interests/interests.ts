import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class InterestsProvider {

  knowledgeTree = {
    'Arts': [
      'Performing arts',
      'Visual arts'
    ],
    'Humanities': [
      'Geography',
      'History',
      'Languages and literature',
      'Philosophy',
      'Theology',
    ],
    'Social sciences': [
      'Anthropology',
      'Economics',
      'Law',
      'Political science',
      'Psychology',
      'Sociology'
    ],
    'Natural sciences': [
      'Biology',
      'Chemistry',
      'Earth sciences',
      'Space sciences',
      'Physics'
    ],
    'Formal sciences': [
      'Computer Science',
      'Mathematics',
      'Statistics'
    ],
    'Applied sciences': [
      'Engineering',
      'Medicine and health sciences'
    ]
  }

  constructor(public http: Http) {
    
  }

}
