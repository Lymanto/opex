import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailRequestComponent } from './detail-request.component';

describe('DetailRequestComponent', () => {
  let component: DetailRequestComponent;
  let fixture: ComponentFixture<DetailRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailRequestComponent]
    });
    fixture = TestBed.createComponent(DetailRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
