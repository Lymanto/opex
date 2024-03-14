import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestRealokasiComponent } from './request-realokasi.component';

describe('RequestRealokasiComponent', () => {
  let component: RequestRealokasiComponent;
  let fixture: ComponentFixture<RequestRealokasiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestRealokasiComponent]
    });
    fixture = TestBed.createComponent(RequestRealokasiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
