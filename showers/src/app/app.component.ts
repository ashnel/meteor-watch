import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  text: any;
  long: any;
  lat: any;
  city: any;
  formSubmit: any;

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ){}

  ngOnInit() {
    this.formSubmit = true;
    this.long;
    this.lat;
    this.test();
  }

  viewTest () {
    console.log('in the app')
    let observable = this._httpService.getNewTest(this.city);
    observable.subscribe(data => {
      // this.text = data['message'];
      this.long = data['long'];
      console.log('long', this.long);
      this.lat = data['lat'];
      this.formSubmit = false;
      this._router.navigate(['/view/' + this.city]);
  });
  }

  test () {
    let observable = this._httpService.getTest();
      observable.subscribe(data => {
        console.log('in test', data);
        // this.text = data['message'];
        // this.long = data['long'];
        // this.lat = data['lat'];
    });
  }
}
