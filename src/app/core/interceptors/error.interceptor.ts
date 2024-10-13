import { log } from '@angular-devkit/build-angular/src/builders/ssr-dev-server';
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
        toastr.error(response.error.detail, response.status.toString());
      }

      if (response?.status === 401) {
        toastr.error(response.error.detail, response.status.toString());
      }

      if (response?.status === 404) {
        toastr.error(response.error.detail, response.status.toString());
        router.navigateByUrl('/notFound');
      }
      if (response?.status === 500) {
        router.navigateByUrl('/serverError');
      }

      return throwError(() => new Error(response.message));
    })
  );
};
