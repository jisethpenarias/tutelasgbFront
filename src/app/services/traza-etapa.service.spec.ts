import { TestBed } from '@angular/core/testing';

import { TrazaEtapaService } from './traza-etapa.service';

describe('TrazaEtapaService', () => {
  let service: TrazaEtapaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrazaEtapaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
