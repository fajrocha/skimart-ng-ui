import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';

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
    path: 'contact',
    loadComponent: () =>
      import('./contact/contact.component').then((mod) => mod.ContactComponent),
  },
];
