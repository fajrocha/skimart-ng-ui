import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../../account/account.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const router = inject(Router);

  return accountService.currentUser$.pipe(
    map((user) => {
      if (user) return true;

      router.navigate(['/account/login'], {
        queryParams: { returnUrl: state.url },
      });

      return false;
    })
  );
};
