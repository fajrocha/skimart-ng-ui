import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { breadcrumb: 'home', info: 'home' },
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
