import { Component, inject } from '@angular/core';
import { OrderService } from './order.service';
import { Order } from '../shared/models/order/order';
import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [DatePipe, CurrencyPipe, RouterModule, NgClass],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent {
  orders: Order[] = [];
  orderService = inject(OrderService);

  ngOnInit() {
    this.orderService
      .getOrdersForUser()
      .subscribe({ next: (response) => (this.orders = response) });
  }

  getStatusStyles(orderStatus: string) {
    const status = orderStatus.toLowerCase();

    switch (status) {
      case 'pending':
        return 'bg-warning';
      case 'payment received':
        return 'bg-success';
      case 'payment failed':
        return 'bg-danger';
      default:
        return 'bg-primary';
    }
  }
}
