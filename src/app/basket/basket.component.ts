import { Component } from '@angular/core';
import { BasketSummaryComponent } from '../shared/components/basket-summary/basket-summary.component';
import { BasketService } from './basket.service';
import { BasketItem } from '../shared/models/basket/basket-item';
import { AsyncPipe, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [BasketSummaryComponent, NgIf, AsyncPipe, RouterModule],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss',
})
export class BasketComponent {
  constructor(public basketService: BasketService) {}

  incrementQuantity(item: BasketItem) {
    this.basketService.addItemToBasket(item, 1);
  }

  decrementQuantity(event: { id: number; quantity: number }) {
    const { id, quantity } = event;
    this.basketService.removeItemFromBasket(id, quantity);
  }
}
