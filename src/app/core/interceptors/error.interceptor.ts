import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toastr = inject(ToastrService);

  return next(req).pipe(
    catchError((response: HttpErrorResponse) => {
      if (response?.status === 400) {
        if (response.error.reasons) {
          toastr.error(response.error.reasons, response.status.toString());
        } else {
          toastr.error(response.error.message, response.status.toString());
        }
      }

      if (response?.status === 401) {
        if (response.error.reasons) {
          toastr.error(response.error.reasons, response.status.toString());
        } else {
          toastr.error(response.error.message, response.status.toString());
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
