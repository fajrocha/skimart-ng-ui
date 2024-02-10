import { Component, inject } from '@angular/core';
import { AccountService } from '../account/account.service';
import { BasketService } from '../basket/basket.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { log } from '@angular-devkit/build-angular/src/builders/ssr-dev-server';
import { CheckoutAddressComponent } from './checkout-address/checkout-address.component';
import { StepperComponent } from '../shared/components/stepper/stepper.component';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { TextInputComponent } from '../shared/components/text-input/text-input.component';
import { CheckoutDeliveryComponent } from './checkout-delivery/checkout-delivery.component';
import { CheckoutPaymentComponent } from './checkout-payment/checkout-payment.component';
import { CheckoutReviewComponent } from './checkout-review/checkout-review.component';
import { OrderTotalsComponent } from '../shared/components/order-totals/order-totals.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CheckoutAddressComponent,
    CheckoutDeliveryComponent,
    CheckoutPaymentComponent,
    CheckoutReviewComponent,
    StepperComponent,
    OrderTotalsComponent,
    CdkStepperModule,
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
  accountService = inject(AccountService);
  basketService = inject(BasketService);

  addressForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    street: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    province: new FormControl('', [Validators.required]),
    zipCode: new FormControl('', [Validators.required]),
  });

  deliveryForm = new FormGroup({
    deliveryMethod: new FormControl('', [Validators.required]),
  });

  paymentForm = new FormGroup({
    nameOnCard: new FormControl('', [Validators.required]),
  });

  checkoutForm = new FormGroup({
    addressForm: this.addressForm,
    deliveryForm: this.deliveryForm,
    paymentForm: this.paymentForm,
  });

  ngOnInit() {
    this.getCurrentDeliveryMethodValue();
  }

  private getCurrentDeliveryMethodValue() {
    const basket = this.basketService.getCurrentBasketValue();

    if (basket && basket.deliveryMethodId) {
      this.checkoutForm
        ?.get('deliveryForm')
        ?.get('deliveryMethod')
        ?.patchValue(basket.deliveryMethodId.toString());
    }
  }
}
