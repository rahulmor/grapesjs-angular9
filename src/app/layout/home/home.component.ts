import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FilterService } from './../../services/filter.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private filterService: FilterService) { }

  ngOnInit(): void {
    const userAgent = window.navigator.userAgent;
    console.log(userAgent);
    console.log("cookie==",this.getCookies());
    this.filterService.setCurrentUrl({url:'home'});
  }
  onAdBuilder(){
    this.router.navigate(['ad-builder']);
  }
  readCookie() {  
    var ca = document.cookie;  
    // // for (var i = 0; i < ca.length; i++) {  
    // //     var c = ca[i];  
    // //     while (c.charAt(0) == ' ') c = c.substring(1, c.length);  
    // //     if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);  
    // // }  
    // return null;  
}  
getCookies() { 
  var cookies = document.cookie.split(';'); 
  var ret = ''; 
  for (var i = 1; i <= cookies.length; i++) { 
      ret += i + ' - ' + cookies[i - 1] + "<br>"; 
  } 
  return ret; 
}

getView(viewName) {
  console.log('viewName',viewName);
}
}
