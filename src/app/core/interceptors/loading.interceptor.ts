import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BusyService } from '../services/busy.service';
import { Observable, delay, finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (request, next) => {
  const busyService = inject(BusyService);

  busyService.busy();

  return next(request).pipe(finalize(() => busyService.idle()));
};
