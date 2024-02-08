import { Component, Input } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { debounceTime, finalize, map, switchMap, take } from 'rxjs';
import { TextInputComponent } from '../../shared/components/text-input/text-input.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, TextInputComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  @Input() debounceTime = 200;
  errorReasons: string[] = [];
  private passwordRegex =
    '(?=^.{6,10}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])' +
    "(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\\s).*$";

  registerForm = new FormGroup({
    displayName: new FormControl('', { validators: [Validators.required] }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      asyncValidators: [this.validateEmailNotTakenAsync()],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.pattern(this.passwordRegex)],
    }),
  });

  constructor(private accountService: AccountService, private router: Router) {}

  onSubmit() {
    this.accountService.register(this.registerForm.value).subscribe({
      next: () => this.router.navigateByUrl('/shop'),
      error: (err) => (this.errorReasons = err.reasons),
    });
  }

  validateEmailNotTakenAsync(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return control.valueChanges.pipe(
        debounceTime(this.debounceTime),
        take(1),
        switchMap(() => {
          return this.accountService.checkEmailExists(control.value).pipe(
            map((result) => (result ? { emailExists: true } : null)),
            finalize(() => control.markAsTouched())
          );
        })
      );
    };
  }
}
