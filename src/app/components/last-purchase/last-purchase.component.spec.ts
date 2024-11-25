import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastPurchaseComponent } from './last-purchase.component';

describe('LastPurchaseComponent', () => {
  let component: LastPurchaseComponent;
  let fixture: ComponentFixture<LastPurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LastPurchaseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LastPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
