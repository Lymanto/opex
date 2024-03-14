import { TestBed } from '@angular/core/testing';

import { KursUsdService } from './kurs-usd.service';

describe('KursUsdService', () => {
  let service: KursUsdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KursUsdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
