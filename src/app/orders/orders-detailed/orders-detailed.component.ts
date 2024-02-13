import { Component, inject } from '@angular/core';
import { Order } from '../../shared/models/order/order';
import { OrderService } from '../order.service';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from '@luhuiguo/xng-breadcrumb';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-orders-detailed',
  standalone: true,
  imports: [NgIf, CurrencyPipe, NgFor],
  templateUrl: './orders-detailed.component.html',
  styleUrl: './orders-detailed.component.scss',
})
export class OrdersDetailedComponent {
  order?: Order;
  private orderService = inject(OrderService);
  private route = inject(ActivatedRoute);
  private bcService = inject(BreadcrumbService);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    id &&
      this.orderService.getOrderById(+id).subscribe({
        next: (order) => {
          this.order = order;
          this.bcService.set('@OrderDetailed', `Order #${order.id}`);
        },
      });
  }
}
