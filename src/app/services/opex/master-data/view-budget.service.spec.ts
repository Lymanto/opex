import { TestBed } from '@angular/core/testing';

import { ViewBudgetService } from './view-budget.service';

describe('ViewBudgetService', () => {
  let service: ViewBudgetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewBudgetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
