import { Component, Input, inject } from '@angular/core';
import { DeliveryMethod } from '../../shared/models/delivery/delivery-method';
import { Form, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CheckoutService } from '../checkout.service';
import { BasketService } from '../../basket/basket.service';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CurrencyPipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-checkout-delivery',
  standalone: true,
  imports: [ReactiveFormsModule, CdkStepperModule, CurrencyPipe],
  templateUrl: './checkout-delivery.component.html',
  styleUrl: './checkout-delivery.component.scss',
})
export class CheckoutDeliveryComponent {
  @Input() checkoutForm?: FormGroup;

  checkoutService = inject(CheckoutService);
  basketService = inject(BasketService);

  deliveryMethods: DeliveryMethod[] = [];

  ngOnInit() {
    this.getDeliveryMethods();
  }

  setShippingPrice(deliveryMethod: DeliveryMethod) {
    this.basketService.setShippingPrice(deliveryMethod);
  }

  private getDeliveryMethods() {
    this.checkoutService.getDeliveryMethods().subscribe({
      next: (dm) => {
        this.deliveryMethods = dm;
      },
    });
  }
}
