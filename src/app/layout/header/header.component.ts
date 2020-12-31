import { Component, OnInit } from '@angular/core';
import { FilterService } from './../../services/filter.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	public filterView: string = 'basic';
	constructor(private filterService: FilterService) { }

	ngOnInit(): void {
	}

	getView(viewName) {
		this.filterView = viewName;
		this.sendData(viewName);
	}

	sendData(viewName){
		this.filterService.sendData(viewName);
	}

}
