import { Component, Input } from '@angular/core';
import { Product } from '../../shared/models/product';
import { RouterModule } from '@angular/router';
import { PriceTagComponent } from '../../shared/price-tag/price-tag.component';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [RouterModule, PriceTagComponent, CurrencyPipe],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss',
})
export class ProductItemComponent {
  @Input() product: Product = {} as Product;

  addItemToBasket() {
    throw new Error('Method not implemented.');
  }
}
