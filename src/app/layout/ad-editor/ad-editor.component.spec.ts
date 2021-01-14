import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdEditorComponent } from './ad-editor.component';
import { FilterService } from './../../services/filter.service';
describe('AdEditorComponent', () => {
  let component: AdEditorComponent;
  let fixture: ComponentFixture<AdEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdEditorComponent ],
      providers: [FilterService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
