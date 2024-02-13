import { Component } from '@angular/core';
import { Product } from '../../shared/models/product';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from '../shop.service';
import { BreadcrumbService } from '@luhuiguo/xng-breadcrumb';
import { PriceTagComponent } from '../../shared/components/price-tag/price-tag.component';
import { CurrencyPipe } from '@angular/common';
import { BasketService } from '../../basket/basket.service';
import { log } from '@angular-devkit/build-angular/src/builders/ssr-dev-server';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [PriceTagComponent, CurrencyPipe],
  templateUrl: './product-details.component.html',
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
