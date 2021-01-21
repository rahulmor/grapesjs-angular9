import { Component, OnInit } from '@angular/core';
import { FilterService } from './../../services/filter.service';
@Component({
  selector: 'app-ad-editor',
  templateUrl: './ad-editor.component.html',
  styleUrls: ['./ad-editor.component.css']
})
export class AdEditorComponent implements OnInit {

  constructor(private filterService: FilterService) { }

  ngOnInit(): void {
    this.filterService.setCurrentUrl({ url: 'ad-builder' });
  }

}
