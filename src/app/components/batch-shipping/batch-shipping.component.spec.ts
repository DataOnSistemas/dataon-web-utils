import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchShippingComponent } from './batch-shipping.component';

describe('BatchShippingComponent', () => {
  let component: BatchShippingComponent;
  let fixture: ComponentFixture<BatchShippingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BatchShippingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BatchShippingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
