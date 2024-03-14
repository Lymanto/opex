import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnelSummaryComponent } from './personnel-summary.component';

describe('PersonnelSummaryComponent', () => {
  let component: PersonnelSummaryComponent;
  let fixture: ComponentFixture<PersonnelSummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonnelSummaryComponent]
    });
    fixture = TestBed.createComponent(PersonnelSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
