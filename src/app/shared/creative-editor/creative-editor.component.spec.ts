import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreativeEditorComponent } from './creative-editor.component';

describe('CreativeEditorComponent', () => {
  let component: CreativeEditorComponent;
  let fixture: ComponentFixture<CreativeEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreativeEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreativeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
