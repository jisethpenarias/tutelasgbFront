import { TestBed } from '@angular/core/testing';

import { TutelaService } from './tutela.service';

describe('TutelaService', () => {
  let service: TutelaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TutelaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
