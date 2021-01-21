import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FilterService } from './../../services/filter.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private filterService: FilterService) { }

  ngOnInit(): void {
    const userAgent = window.navigator.userAgent;
    this.filterService.setCurrentUrl({ url: 'home' });
  }
  onAdBuilder() {
    this.router.navigate(['ad-builder']);
  }
  readCookie() {
    var ca = document.cookie;
  }
  getCookies() {
    var cookies = document.cookie.split(';');
    var ret = '';
    for (var i = 1; i <= cookies.length; i++) {
      ret += i + ' - ' + cookies[i - 1] + "<br>";
    }
    return ret;
  }
  // TODO : Can be removed.
  // getView(viewName) {
  //   console.log('viewName', viewName);
  // }
}
