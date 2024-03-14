import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateReallocationBudgetComponent } from './create-reallocation-budget.component';

describe('CreateReallocationBudgetComponent', () => {
  let component: CreateReallocationBudgetComponent;
  let fixture: ComponentFixture<CreateReallocationBudgetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateReallocationBudgetComponent]
    });
    fixture = TestBed.createComponent(CreateReallocationBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
