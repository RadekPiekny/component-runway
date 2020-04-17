import { TestBed } from '@angular/core/testing';

import { BezierService } from './bezier.service';

describe('BezierService', () => {
  let service: BezierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BezierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
