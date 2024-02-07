import { Component } from '@angular/core';
import { Product } from '../../shared/models/product';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from '../shop.service';
import { BreadcrumbService } from '@luhuiguo/xng-breadcrumb';
import { PriceTagComponent } from '../../shared/price-tag/price-tag.component';
import { CurrencyPipe } from '@angular/common';
import { BasketService } from '../../basket/basket.service';
import { log } from '@angular-devkit/build-angular/src/builders/ssr-dev-server';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [PriceTagComponent, CurrencyPipe],
  template: `<div class="container mt-5">
    @if (product) {
    <div class="row">
      <div class="col-6">
        <img
          src="{{ product.pictureUrl }}"
          alt="{{ product.name }}"
          class="w-100"
        />
      </div>
      <div class="col-6">
        <h3 class="text-primary mb-3">{{ product.name }}</h3>
        <app-price-tag>{{ product.price | currency : 'EUR' }}</app-price-tag>
        <div class="d-flex justify-content-start align-items-center mt-1">
          <select
            class="form-select product-details__quantity"
            (change)="onSelectedQuantity($event)"
          >
            @for (q of quantityDropDown; track q) {
            <option [value]="q">
              {{ q }}
            </option>
            }
          </select>
          <button (click)="addProduct()" class="btn btn-primary shadow-sm ms-3">
            Add to cart
          </button>
        </div>
        <div class="row mt-4">
          <hr class="hr hr-blurry text-primary" />
          <p>{{ product.description }}</p>
        </div>
      </div>
    </div>
    }
  </div>`,
  styleUrl: './product-details.component.scss',
  providers: [],
})
export class ProductDetailsComponent {
  product: Product = {} as Product;
  quantityDropDown = Array.from(Array(100).keys()).map((x) => x + 1);
  quantitySelected = 1;

  constructor(
    private shopService: ShopService,
    private activatedRoute: ActivatedRoute,
    private bcService: BreadcrumbService,
    private basketService: BasketService
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id)
      this.shopService.getProduct(+id).subscribe({
        next: (product) => {
          this.product = product;
          this.bcService.set('@productDetails', product.name);
        },
        error: (err) =>
          console.log('Error occurred while retrieving the product:', err),
      });
  }

  addProduct() {
    this.basketService.addProductToBasket(this.product, this.quantitySelected);
  }

  onSelectedQuantity($event: Event) {
    this.quantitySelected = +($event.target as HTMLSelectElement).value;
  }
}

