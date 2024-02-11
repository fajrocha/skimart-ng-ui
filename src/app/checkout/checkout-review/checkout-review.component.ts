import { CdkStepper, CdkStepperModule } from '@angular/cdk/stepper';
import { Component, Input, inject } from '@angular/core';
import { BasketService } from '../../basket/basket.service';
import { ToastrService } from 'ngx-toastr';
import { BasketSummaryComponent } from '../../shared/components/basket-summary/basket-summary.component';

@Component({
  selector: 'app-checkout-review',
  standalone: true,
  imports: [BasketSummaryComponent, CdkStepperModule],
  templateUrl: './checkout-review.component.html',
  styleUrl: './checkout-review.component.scss',
})
export class CheckoutReviewComponent {
  @Input() appStepper?: CdkStepper;

  basketService = inject(BasketService);
  toastr = inject(ToastrService);

  createPaymentIntent() {
    this.basketService.createPaymentIntent().subscribe({
      next: () => {
        this.appStepper?.next();
      },
      error: (err) => this.toastr.error(err.message),
    });
  }
}
