import { Component, OnInit } from '@angular/core';
import { FilterService } from './../../services/filter.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showDiv = false;
  public filterView: string = 'basic';
  public style_nav: boolean = false;
  constructor(private filterService: FilterService) { }

  ngOnInit(): void {
    this.filterService.data.subscribe((data) => {
      //do what ever needs doing when data changes
      console.log('url=', data);
      if (data.url == 'ad-builder') {
        this.style_nav = true;
      } else if (data.url == 'home') {
        this.style_nav = false;
      }
    });
  }

  getView(viewName) {
    this.filterView = viewName;
    this.sendData(viewName);
  }

  sendData(viewName) {
    this.filterService.sendData(viewName);
  }
  //Exit button message Div
  messageExit() {
    this.showDiv = true;
  }
  //delete message Div on click of cross
  messageDismiss() {
    this.showDiv = false;
  }
}
