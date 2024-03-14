import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NeedApprovalComponent } from './need-approval.component';

describe('NeedApprovalComponent', () => {
  let component: NeedApprovalComponent;
  let fixture: ComponentFixture<NeedApprovalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NeedApprovalComponent],
    });
    fixture = TestBed.createComponent(NeedApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
