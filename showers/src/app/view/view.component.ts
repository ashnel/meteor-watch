import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  text: any;
  long: any;
  lat: any;
  city: any;
  intro: any;
  hour: any;
  view: any;
  feed: any;
  formSubmit: any;
  color: any;

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    // this.test();
    console.log('in ngoninit')
    this.viewTest();
    this.formSubmit = false;
  }

  viewTest () {
    console.log('in the view')
    let observable = this._httpService.getNewTest(this._route.params['value'].city);
    observable.subscribe(data => {
      this.text = data['message'];
      this.long = data['long'];
      this.lat = data['lat'];
      this.intro = data['intro'];
      this.hour = data['hour'];
      this.view = data['view'];
      for(var i = data['feed'].length - 1; i >= 0; i--) {
        if(data['feed'][i].title.includes('Today') || data['feed'][i].title.includes('Tomorrow')) {
          data['feed'][i].class = 'green';
        }
        if(data['feed'][i].title.includes('days ago')) {
          data['feed'].splice(i, 1);
        }
      }
      this.feed = data['feed'];
      for(var i = this.feed.length - 1; i >= 0; i--) {
        var strIdx = this.feed[i].title.indexOf(':');
        var dateStatement = this.feed[i].title.slice(0, strIdx);
        var introAfter = this.feed[i].title.slice(strIdx + 1);
        var introIdx2 = introAfter.indexOf('r');
        var title = introAfter.slice(0, -1);
        title += 'r';
        this.feed[i].id = i;
        this.feed[i].date = dateStatement;
        this.feed[i].newTitle = title;
      }
  });
  }

  click (id) {
    let observable = this._httpService.getAnotherTest(id, this._route.params['value'].city);
    observable.subscribe(data => {
      this.text = data['message'];
      this.long = data['long'];
      this.lat = data['lat'];
      this.intro = data['intro'];
      this.hour = data['hour'];
      this.view = data['view'];
      if(data['view'].includes('0')) {
        this.color = 'red';
      }
      // for(var i = data['feed'].length - 1; i >= 0; i--) {
      //   if(data['feed'][i].title.includes('days ago')) {
      //     data['feed'].splice(i, 1);
      //   }
      // }
      // this.feed = data['feed'];
      // for(var i = this.feed.length - 1; i >= 0; i--) {
      //   var strIdx = this.feed[i].title.indexOf(':');
      //   var dateStatement = this.feed[i].title.slice(0, strIdx);
      //   var introAfter = this.feed[i].title.slice(strIdx + 1);
      //   var introIdx2 = introAfter.indexOf('r');
      //   var title = introAfter.slice(0, -1);
      //   title += 'r';
      //   this.feed[i].id = i;
      //   this.feed[i].date = dateStatement;
      //   this.feed[i].newTitle = title;
      // }
  });
  }
  // test () {
    // let observable = this._httpService.getTest();
    //   observable.subscribe(data => {
    //     console.log(data);
        // this.text = data['message'];
        // this.long = data['long'];
        // this.lat = data['lat'];
    // });
  // }
}
