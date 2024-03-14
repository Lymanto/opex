import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackApplicationComponent } from './feedback-application.component';

describe('FeedbackApplicationComponent', () => {
  let component: FeedbackApplicationComponent;
  let fixture: ComponentFixture<FeedbackApplicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeedbackApplicationComponent]
    });
    fixture = TestBed.createComponent(FeedbackApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
