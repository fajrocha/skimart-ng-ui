import { Component, Input, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '../../account/account.service';
import { ToastrService } from 'ngx-toastr';
import { TextInputComponent } from '../../shared/components/text-input/text-input.component';
import { RouterModule } from '@angular/router';
import { CdkStepperModule } from '@angular/cdk/stepper';

@Component({
  selector: 'app-checkout-address',
  standalone: true,
  imports: [
    TextInputComponent,
    ReactiveFormsModule,
    RouterModule,
    CdkStepperModule,
  ],
  templateUrl: './checkout-address.component.html',
  styleUrl: './checkout-address.component.scss',
})
export class CheckoutAddressComponent {
  @Input() checkoutForm?: FormGroup;

  accountService = inject(AccountService);
  toastr = inject(ToastrService);

  ngOnInit() {
    this.getAddressFormValues();
  }

  getAddressFormValues() {
    this.accountService.getUserAddress().subscribe({
      next: (response) => {
        response && this.checkoutForm?.get('addressForm')?.patchValue(response);
      },
    });
  }

  saveUserAddress() {
    const address = this.checkoutForm?.get('addressForm')?.value;
    this.accountService.updateUserAddress(address).subscribe({
      next: () => {
        this.toastr.success('Address saved!');
        this.checkoutForm?.get('addressForm')?.reset(address);
      },
    });
  }
}
