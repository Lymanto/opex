import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingApprovalComponent } from './tracking-approval.component';

describe('TrackingApprovalComponent', () => {
  let component: TrackingApprovalComponent;
  let fixture: ComponentFixture<TrackingApprovalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrackingApprovalComponent]
    });
    fixture = TestBed.createComponent(TrackingApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
