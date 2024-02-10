import { Component, inject } from '@angular/core';
import { BasketService } from '../../../basket/basket.service';
import { AsyncPipe, CurrencyPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-order-totals',
  standalone: true,
  imports: [CurrencyPipe, NgIf, AsyncPipe],
  templateUrl: './order-totals.component.html',
  styleUrl: './order-totals.component.scss',
})
export class OrderTotalsComponent {
  basketService = inject(BasketService);
}
