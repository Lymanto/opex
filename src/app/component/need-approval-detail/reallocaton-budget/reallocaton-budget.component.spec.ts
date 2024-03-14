import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReallocatonBudgetComponent } from './reallocaton-budget.component';

describe('ReallocatonBudgetComponent', () => {
  let component: ReallocatonBudgetComponent;
  let fixture: ComponentFixture<ReallocatonBudgetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReallocatonBudgetComponent]
    });
    fixture = TestBed.createComponent(ReallocatonBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
