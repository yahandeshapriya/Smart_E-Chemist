import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryPaymentComponent } from './deliverypayment.component';

describe('DeliveryPaymentComponent', () => {
  let component: DeliveryPaymentComponent;
  let fixture: ComponentFixture<DeliveryPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeliveryPaymentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DeliveryPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
