import { TestBed } from '@angular/core/testing';

import { RequestVerificationService } from './request-verification.service';

describe('RequestVerificationService', () => {
  let service: RequestVerificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestVerificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
