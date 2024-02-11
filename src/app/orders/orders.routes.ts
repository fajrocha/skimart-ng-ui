import { Routes } from '@angular/router';
import { OrdersComponent } from './orders.component';
import { OrdersDetailedComponent } from './orders-detailed/orders-detailed.component';

export const ORDER_ROUTES: Routes = [
  {
    path: '',
    component: OrdersComponent,
  },
  {
    path: ':id',
    component: OrdersDetailedComponent,
  },
];
