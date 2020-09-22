import { TestBed } from '@angular/core/testing';

import { SipareApiService } from './sipare-api.service';

describe('SipareApiService', () => {
  let service: SipareApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SipareApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
