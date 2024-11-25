import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionMarketingComponent } from './action-marketing.component';

describe('ActionMarketingComponent', () => {
  let component: ActionMarketingComponent;
  let fixture: ComponentFixture<ActionMarketingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionMarketingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActionMarketingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
