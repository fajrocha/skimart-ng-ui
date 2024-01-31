import { Component, NgModule } from '@angular/core';
import { ShopService } from '../shop.service';
import { Product } from '../shared/models/product';
import { ProductBrand } from '../shared/models/product-brand';
import { ProductType } from '../shared/models/product-type';
import { ShopParams } from '../shared/models/shop-params';
import { NgClass } from '@angular/common';
import { PagerComponent } from '../shared/pager/pager.component';

interface SortOptions {
  name: string;
  value: string;
}

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [NgClass, PagerComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
  providers: [ShopService],
})
export class ShopComponent {
  products: Product[] = [];
  brands: ProductBrand[] = [];
  types: ProductType[] = [];
  shopParams: ShopParams;
  totalCount = 0;
  sortOpts: SortOptions[] = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low to high', value: 'priceAsc' },
    { name: 'Price: High to low', value: 'priceDesc' },
  ];

  constructor(private shopService: ShopService) {
    this.shopParams = this.shopService.shopParams;
  }

  ngOnInit() {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts() {
    this.shopService.getProducts().subscribe({
      next: (response) => {
        this.products = response.data;
        this.shopParams.pageIndex = response.pageIndex;
        this.shopParams.pageSize = response.pageSize;
        this.totalCount = response.count;
      },
      error: (error) => console.log(error),
    });
  }

  getBrands() {
    this.shopService.getBrands().subscribe({
      next: (response) => (this.brands = [{ id: 0, name: 'All' }, ...response]),
      error: (error) => console.log(error),
    });
  }

  getTypes() {
    this.shopService.getTypes().subscribe({
      next: (response) => (this.types = [{ id: 0, name: 'All' }, ...response]),
      error: (error) => console.log(error),
    });
  }

  onBrandSelected(brandId: number) {
    const params = this.shopService.getShopParams();
    params.pageIndex = 1;
    params.brandId = brandId;
    this.setShopParams(params);

    this.getProducts();
  }

  onTypeSelected(typeId: number) {
    const params = this.shopService.getShopParams();
    params.pageIndex = 1;
    params.typeId = typeId;
    this.setShopParams(params);

    this.getProducts();
  }

  onSortSelected(event: Event) {
    const params = this.shopService.getShopParams();
    params.sortSelected = (event.target as HTMLSelectElement).value;
    this.setShopParams(params);

    this.getProducts();
  }

  onPageChange(page: number) {
    const params = this.shopService.getShopParams();

    if (params.pageIndex === page) return;

    params.pageIndex = page;
    this.setShopParams(params);

    this.getProducts();
  }

  private setShopParams(params: ShopParams) {
    this.shopService.setShopParams(params);
    this.shopParams = params;
  }
}
