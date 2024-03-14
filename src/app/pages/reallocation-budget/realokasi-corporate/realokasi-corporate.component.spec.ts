import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealokasiCorporateComponent } from './realokasi-corporate.component';

describe('RealokasiCorporateComponent', () => {
  let component: RealokasiCorporateComponent;
  let fixture: ComponentFixture<RealokasiCorporateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RealokasiCorporateComponent]
    });
    fixture = TestBed.createComponent(RealokasiCorporateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
