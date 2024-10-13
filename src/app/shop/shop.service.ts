import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ShopParams } from '../shared/models/shop-params';
import { Pagination } from '../shared/models/pagination';
import { Product } from '../shared/models/product';
import { ProductType } from '../shared/models/product-type';
import { ProductBrand } from '../shared/models/product-brand';
import { map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  baseUrl = environment.apiUrl;
  shopParams = new ShopParams();
  brands: ProductBrand[] = [];
  types: ProductType[] = [];

  private productCache = new Map<string, Pagination<Product[]>>();

  constructor(private httpClient: HttpClient) {}

  getProducts() {
    let requestParams = new HttpParams();
    const cachedProducts = this.checkProductsCache();
    if (cachedProducts) return of(cachedProducts);

    const { brandId, typeId, sortSelected, pageIndex, pageSize, search } =
      this.shopParams;

    if (brandId > 0) requestParams = requestParams.append('brandId', brandId);
    if (typeId > 0) requestParams = requestParams.append('typeId', typeId);
    requestParams = requestParams.append('sort', sortSelected);
    requestParams = requestParams.append('pageIndex', pageIndex);
    requestParams = requestParams.append('pageSize', pageSize);
    if (search) requestParams = requestParams.append('search', search);

    return this.httpClient
      .get<Pagination<Product[]>>(`${this.baseUrl}/products`, {
        params: requestParams,
      })
      .pipe(
        map((response) => {
          const cacheKey = this.getCacheKey(this.shopParams);
          this.productCache.set(cacheKey, response);
          return response;
        })
      );
  }

  getProduct(id: number) {
    const products = [...this.productCache.values()];

    const product = [...this.productCache.values()].reduce(
      (acc, paginatedResult) => {
        return { ...acc, ...paginatedResult.data.find((x) => x.id === id) };
      },
      {} as Product
    );

    if (Object.keys(product).length !== 0) return of(product);

    return this.httpClient.get<Product>(`${this.baseUrl}/products/${id}`);
  }

  getBrands() {
    if (this.brands.length > 0) return of(this.brands);

    return this.httpClient
      .get<ProductBrand[]>(`${this.baseUrl}/products/brands`)
      .pipe(
        map((response) => {
          this.brands = response;
          return response;
        })
      );
  }

  getTypes() {
    if (this.types.length > 0) return of(this.types);

    return this.httpClient
      .get<ProductType[]>(`${this.baseUrl}/products/types`)
      .pipe(
        map((response) => {
          this.types = response;
          return response;
        })
      );
  }

  setShopParams(params: ShopParams) {
    this.shopParams = params;
  }

  getShopParams() {
    return this.shopParams;
  }

  private checkProductsCache() {
    if (!this.productCache.size) return undefined;

    const cacheKey = this.getCacheKey(this.shopParams);

    return this.productCache.get(cacheKey);
  }

  private getCacheKey(object: Object) {
    return Object.values(object).join('-');
  }
}
