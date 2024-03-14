import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingApprovalReallocationComponent } from './tracking-approval-reallocation.component';

describe('TrackingApprovalReallocationComponent', () => {
  let component: TrackingApprovalReallocationComponent;
  let fixture: ComponentFixture<TrackingApprovalReallocationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrackingApprovalReallocationComponent],
    });
    fixture = TestBed.createComponent(TrackingApprovalReallocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
