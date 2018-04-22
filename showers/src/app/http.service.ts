import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) { }

  getTest () {
    return this._http.get('/test');
  }

  getNewTest (city) {
    console.log('service', city);
    return this._http.post('/test', {city: city});
  }

  getAnotherTest (id, city) {
    return this._http.post('/testanother', {id: id, city: city});
  }
}
