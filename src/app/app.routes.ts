import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { breadcrumb: 'home', info: 'home' },
  },
  {
    path: 'serverError',
    component: ServerErrorComponent,
  },
  {
    path: 'notFound',
    component: NotFoundComponent,
  },
  {
    path: 'shop',
    loadChildren: () =>
      import('./shop/shop.routes').then((mod) => mod.SHOP_ROUTES),
  },
  {
    path: 'basket',
    loadComponent: () =>
      import('./basket/basket.component').then((mod) => mod.BasketComponent),
  },
  {
    path: 'checkout',
    loadChildren: () =>
      import('./checkout/checkout.routes').then((mod) => mod.CHECKOUT_ROUTES),
    canActivate: [authGuard],
  },
  {
    path: 'orders',
    loadChildren: () =>
      import('./orders/orders.routes').then((m) => m.ORDER_ROUTES),
    data: { breadcrumb: 'Orders' },
    canActivate: [authGuard],
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./account/account.routes').then((mod) => mod.ACCOUNT_ROUTES),
  },
];
