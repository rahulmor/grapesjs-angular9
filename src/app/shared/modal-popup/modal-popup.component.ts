import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-popup',
  templateUrl: './modal-popup.component.html',
  styleUrls: ['./modal-popup.component.css']
})
export class ModalPopupComponent implements OnInit {

  constructor(private router: Router, ) { }

  ngOnInit(): void {
  }
  //Redirect to Home page
  continueRoute() {
    this.router.navigate(['/home']);
  }
}
