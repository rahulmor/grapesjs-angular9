import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AdEditorComponent } from './ad-editor.component';
import { FilterService } from './../../services/filter.service';

describe('AdEditorComponent', () => {
  let component: AdEditorComponent;
  let fixture: ComponentFixture<AdEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdEditorComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
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
