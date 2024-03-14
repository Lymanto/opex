import { TestBed } from '@angular/core/testing';

import { GlaccountService } from './glaccount.service';

describe('GlaccountService', () => {
  let service: GlaccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlaccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
