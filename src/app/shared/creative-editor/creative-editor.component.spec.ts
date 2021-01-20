import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreativeEditorComponent } from './creative-editor.component';
import { FilterService } from './../../services/filter.service';
describe('CreativeEditorComponent', () => {
  let component: CreativeEditorComponent;
  let fixture: ComponentFixture<CreativeEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreativeEditorComponent],
      providers: [FilterService]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreativeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create creative editor', () => {
    expect(component.stepinfoBox).toBeTruthy();
  });
});
