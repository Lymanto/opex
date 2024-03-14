import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemReallocationComponent } from './item-reallocation.component';

describe('ItemReallocationComponent', () => {
  let component: ItemReallocationComponent;
  let fixture: ComponentFixture<ItemReallocationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemReallocationComponent]
    });
    fixture = TestBed.createComponent(ItemReallocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
