import { TestBed } from '@angular/core/testing';

import { BezCoinsService } from './bez-coins.service';

describe('BezCoinsService', () => {
  let service: BezCoinsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BezCoinsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
