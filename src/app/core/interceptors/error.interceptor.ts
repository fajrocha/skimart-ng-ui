import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((response: HttpErrorResponse) => {
      if (response?.status === 400) {
        if (response.error.reasons) {
          throw response.error;
        }
      }

      if (response?.status === 401) {
        if (response.error.reasons) {
          throw response.error;
        }
      }

      if (response?.status === 404) {
        router.navigateByUrl('/notFound');
      }
      if (response?.status === 500) {
        router.navigateByUrl('/serverError');
      }

      return throwError(() => new Error(response.message));
    })
  );
};
