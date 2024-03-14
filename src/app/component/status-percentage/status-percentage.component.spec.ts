import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusPercentageComponent } from './status-percentage.component';

describe('StatusPercentageComponent', () => {
  let component: StatusPercentageComponent;
  let fixture: ComponentFixture<StatusPercentageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatusPercentageComponent]
    });
    fixture = TestBed.createComponent(StatusPercentageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
