import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastPurchaseProductsComponent } from './last-purchase-products.component';

describe('LastPurchaseProductsComponent', () => {
  let component: LastPurchaseProductsComponent;
  let fixture: ComponentFixture<LastPurchaseProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LastPurchaseProductsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LastPurchaseProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
