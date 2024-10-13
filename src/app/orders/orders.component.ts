import { Component, inject } from '@angular/core';
import { OrderService } from './order.service';
import { Order, OrderStatus } from '../shared/models/order/order';
import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { RouterModule } from '@angular/router';
import { log } from '@angular-devkit/build-angular/src/builders/ssr-dev-server';

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
    this.orderService.getOrdersForUser().subscribe({
      next: (response) => {
        console.log(response);
        this.orders = response;
      },
    });
  }

  getStatusStyles(orderStatus: OrderStatus) {
    switch (orderStatus) {
      case OrderStatus.Pending:
        return 'bg-warning';
      case OrderStatus.PaymentReceived:
        return 'bg-success';
      case OrderStatus.PaymentFailed:
        return 'bg-danger';
      default:
        return 'bg-primary';
    }
  }

  getStatusText(orderStatus: OrderStatus) {
    switch (orderStatus) {
      case OrderStatus.Pending:
        return 'Pending';
      case OrderStatus.PaymentReceived:
        return 'Payment Received';
      case OrderStatus.PaymentFailed:
        return 'Payment Failed';
      default:
        return 'Pending';
    }
  }
}
