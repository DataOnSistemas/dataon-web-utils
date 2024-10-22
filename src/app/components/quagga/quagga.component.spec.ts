import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuaggaComponent } from './quagga.component';

describe('QuaggaComponent', () => {
  let component: QuaggaComponent;
  let fixture: ComponentFixture<QuaggaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuaggaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuaggaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
