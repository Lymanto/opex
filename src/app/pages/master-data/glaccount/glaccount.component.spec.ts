import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GLAccountComponent } from './glaccount.component';

describe('GLAccountComponent', () => {
  let component: GLAccountComponent;
  let fixture: ComponentFixture<GLAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GLAccountComponent]
    });
    fixture = TestBed.createComponent(GLAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
