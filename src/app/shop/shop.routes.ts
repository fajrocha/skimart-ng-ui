import { Routes } from '@angular/router';
import { ShopComponent } from './shop.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

export const SHOP_ROUTES: Routes = [
  {
    path: '',
    component: ShopComponent,
  },
  {
    path: ':id',
    component: ProductDetailsComponent,
  },
];
