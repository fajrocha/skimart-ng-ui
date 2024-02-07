import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BasketItem } from '../models/basket/basket-item';
import { BasketService } from '../../basket/basket.service';
import { AsyncPipe, CurrencyPipe, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';

interface BasketItemDto {
  id: number;
  quantity: number;
}

@Component({
  selector: 'app-basket-summary',
  standalone: true,
  imports: [NgIf, CurrencyPipe, AsyncPipe, RouterModule],
  templateUrl: './basket-summary.component.html',
  styleUrl: './basket-summary.component.scss',
})
export class BasketSummaryComponent {
  @Output() addItem = new EventEmitter<BasketItem>();
  @Output() removeItem = new EventEmitter<BasketItemDto>();
  @Input() isBasket = true;

  constructor(public basketService: BasketService) {}

  addBasketItem(item: BasketItem) {
    this.addItem.emit(item);
  }

  removeBasketItem(id: number, quantity = 1) {
    this.removeItem.emit({ id: id, quantity: quantity });
  }
}
