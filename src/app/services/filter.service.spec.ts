import { TestBed, async, getTestBed  } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { FilterService } from './filter.service';

describe('FilterService', () => {
  let injector: TestBed;
  let service: FilterService;
  let httpMock: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FilterService],
    });
    injector = getTestBed();
    service = injector.get(FilterService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
    });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
