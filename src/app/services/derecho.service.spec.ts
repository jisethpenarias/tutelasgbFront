import { TestBed } from '@angular/core/testing';

import { DerechoService } from './derecho.service';

describe('DerechoService', () => {
  let service: DerechoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DerechoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
