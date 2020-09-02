import { TestBed } from '@angular/core/testing';

import { BitacoraServiceService } from './bitacora-service.service';

describe('BitacoraServiceService', () => {
  let service: BitacoraServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BitacoraServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
