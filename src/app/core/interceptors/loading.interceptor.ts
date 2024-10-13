import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { BusyService } from '../services/busy.service';
import { delay, finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (request, next) => {
  const busyService = inject(BusyService);

  busyService.busy();

  return next(request).pipe(finalize(() => busyService.idle()));
};
