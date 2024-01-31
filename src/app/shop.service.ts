import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { ShopParams } from './shared/models/shop-params';
import { Pagination } from './shared/models/pagination';
import { Product } from './shared/models/product';
import { ProductType } from './shared/models/product-type';
import { ProductBrand } from './shared/models/product-brand';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  baseUrl = environment.apiUrl;
  shopParams = new ShopParams();

  constructor(private httpClient: HttpClient) {}

  getProducts() {
    let requestParams = new HttpParams();

    const { brandId, typeId, sortSelected, pageIndex, pageSize, search } =
      this.shopParams;

    if (brandId > 0) requestParams = requestParams.append('brandId', brandId);
    if (typeId > 0) requestParams = requestParams.append('typeId', typeId);
    requestParams = requestParams.append('sort', sortSelected);
    requestParams = requestParams.append('pageIndex', pageIndex);
    requestParams = requestParams.append('pageSize', pageSize);
    if (search) requestParams = requestParams.append('search', search);

    return this.httpClient.get<Pagination<Product[]>>(
      `${this.baseUrl}/products`,
      {
        params: requestParams,
      }
    );
  }

  getProduct(id: number) {
    return this.httpClient.get<Product>(`${this.baseUrl}/products/${id}`);
  }

  getBrands() {
    return this.httpClient.get<ProductBrand[]>(
      `${this.baseUrl}/products/brands`
    );
  }

  getTypes() {
    return this.httpClient.get<ProductType[]>(`${this.baseUrl}/products/types`);
  }

  setShopParams(params: ShopParams) {
    this.shopParams = params;
  }

  getShopParams() {
    return this.shopParams;
  }
}
