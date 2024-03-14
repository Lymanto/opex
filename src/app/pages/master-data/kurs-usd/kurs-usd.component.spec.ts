import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KursUsdComponent } from './kurs-usd.component';

describe('KursUsdComponent', () => {
  let component: KursUsdComponent;
  let fixture: ComponentFixture<KursUsdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KursUsdComponent]
    });
    fixture = TestBed.createComponent(KursUsdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
