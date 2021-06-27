import { TestBed } from '@angular/core/testing';

import { StockeventemitterService } from './stockeventemitter.service';

describe('StockeventemitterService', () => {
  let service: StockeventemitterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockeventemitterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
