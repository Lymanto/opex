import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuidanceApplicationComponent } from './guidance-application.component';

describe('GuidanceApplicationComponent', () => {
  let component: GuidanceApplicationComponent;
  let fixture: ComponentFixture<GuidanceApplicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuidanceApplicationComponent]
    });
    fixture = TestBed.createComponent(GuidanceApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
