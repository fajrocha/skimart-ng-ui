import { Component, ElementRef, Input, ViewChild, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NavigationExtras, Router, RouterModule } from '@angular/router';
import {
  Stripe,
  StripeCardCvcElement,
  StripeCardExpiryElement,
  StripeCardNumberElement,
  loadStripe,
} from '@stripe/stripe-js';
import { BasketService } from '../../basket/basket.service';
import { CheckoutService } from '../checkout.service';
import { ToastrService } from 'ngx-toastr';
import { BusyService } from '../../core/services/busy.service';
import { environment } from '../../../environments/environment';
import { Basket } from '../../shared/models/basket/basket';
import { firstValueFrom } from 'rxjs';
import { OrderToCreate } from '../../shared/models/order/order-to-create';
import { Address } from '../../shared/models/account/address';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { TextInputComponent } from '../../shared/components/text-input/text-input.component';

@Component({
  selector: 'app-checkout-payment',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    CdkStepperModule,
    TextInputComponent,
  ],
  templateUrl: './checkout-payment.component.html',
  styleUrl: './checkout-payment.component.scss',
})
export class CheckoutPaymentComponent {
  @Input() checkoutForm?: FormGroup;
  @ViewChild('cardNumber') cardNumberElement?: ElementRef;
  @ViewChild('cardExpiry') cardExpiryElement?: ElementRef;
  @ViewChild('cardCvc') cardCvcElement?: ElementRef;

  stripe: Stripe | null = null;
  cardNumber?: StripeCardNumberElement;
  cardExpiry?: StripeCardExpiryElement;
  cardCvc?: StripeCardCvcElement;

  cardNumberValid = false;
  cardExpiryValid = false;
  cardCvcValid = false;

  cardNumberErrors?: any;
  cardExpiryErrors?: any;
  cardCvcErrors?: any;

  basketService = inject(BasketService);
  checkoutService = inject(CheckoutService);
  toastr = inject(ToastrService);
  router = inject(Router);
  busyService = inject(BusyService);

  ngOnInit() {
    loadStripe(environment.paymentPubKey).then((stripe) => {
      this.stripe = stripe;
      const elements = stripe?.elements();

      if (elements) {
        this.cardNumber = elements.create('cardNumber');
        this.cardNumber?.mount(this.cardNumberElement?.nativeElement);
        this.cardNumber.on('change', (event) => {
          this.cardNumberValid = event.complete;
          if (event.error) this.cardNumberErrors = event.error.message;
          else this.cardNumberErrors = null;
        });

        this.cardExpiry = elements.create('cardExpiry');
        this.cardExpiry?.mount(this.cardExpiryElement?.nativeElement);
        this.cardExpiry.on('change', (event) => {
          this.cardExpiryValid = event.complete;
          if (event.error) this.cardExpiryErrors = event.error.message;
          else this.cardExpiryErrors = null;
        });

        this.cardCvc = elements.create('cardCvc');
        this.cardCvc?.mount(this.cardCvcElement?.nativeElement);
        this.cardCvc.on('change', (event) => {
          this.cardCvcValid = event.complete;
          if (event.error) this.cardCvcErrors = event.error.message;
          else this.cardCvcErrors = null;
        });
      }
    });
  }

  get validPaymentForms() {
    return (
      this.checkoutForm?.get('paymentForm')?.valid &&
      this.cardNumberValid &&
      this.cardExpiryValid &&
      this.cardCvcValid
    );
  }

  async submitOrder() {
    this.busyService.busy();

    try {
      const basket = this.getBasket();
      const order = await this.createOrder(basket);
      const paymentResult = await this.confirmPayment(basket);

      if (paymentResult.paymentIntent) {
        this.basketService.deleteBasket(basket);
        const navigationExtras: NavigationExtras = { state: order };
        await this.router.navigate(['checkout/success'], navigationExtras);
      } else {
        this.toastr.error(paymentResult.error.message);
      }
    } catch (error: any) {
      this.toastr.error(error.message);
    } finally {
      this.busyService.idle();
    }
  }

  private getBasket() {
    const basket = this.basketService.getCurrentBasketValue();
    if (!basket) throw Error('Basket not found.');

    return basket;
  }

  private async createOrder(basket: Basket) {
    const order = this.getOrderToCreate(basket);
    if (!order) throw Error('Error creating order.');

    return firstValueFrom(this.checkoutService.createOrder(order));
  }

  private getOrderToCreate(basket: Basket): OrderToCreate | null {
    const deliveryMethod = this.checkoutForm
      ?.get('deliveryForm')
      ?.get('deliveryMethod')?.value as string;

    const shippingAddress = this.checkoutForm?.get('addressForm')
      ?.value as Address;

    if (!deliveryMethod || !shippingAddress) return null;

    return {
      basketId: basket.id,
      deliveryMethodId: deliveryMethod,
      shippingAddress: shippingAddress,
    };
  }

  private async confirmPayment(basket: Basket) {
    if (!this.cardNumber)
      throw Error('Problem to confirm payment, missing card information.');

    if (!basket.clientSecret)
      throw Error('Problem to confirm payment, basket information.');

    const result = this.stripe?.confirmCardPayment(basket.clientSecret, {
      payment_method: {
        card: this.cardNumber,
        billing_details: {
          name: this.checkoutForm?.get('paymentForm')?.get('nameOnCard')?.value,
        },
      },
    });

    if (!result) throw Error('Problem attempting payment with Stripe.');

    return result;
  }
}
