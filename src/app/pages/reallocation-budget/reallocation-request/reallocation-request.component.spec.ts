import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReallocationRequestComponent } from './reallocation-request.component';

describe('ReallocationRequestComponent', () => {
  let component: ReallocationRequestComponent;
  let fixture: ComponentFixture<ReallocationRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReallocationRequestComponent]
    });
    fixture = TestBed.createComponent(ReallocationRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
