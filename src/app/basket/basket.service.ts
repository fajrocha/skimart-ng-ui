import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, map } from 'rxjs';
import { Basket } from '../shared/models/basket/basket';
import { BasketTotals } from '../shared/models/basket/basket-totals';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product } from '../shared/models/product';
import { BasketItem } from '../shared/models/basket/basket-item';
import { log } from '@angular-devkit/build-angular/src/builders/ssr-dev-server';
import { DeliveryMethod } from '../shared/models/delivery/delivery-method';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  baseUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<Basket | null>(null);
  basketSource$ = this.basketSource.asObservable();
  private basketTotalSource = new BehaviorSubject<BasketTotals | null>(null);
  basketTotalSource$ = this.basketTotalSource.asObservable();
  constructor(private httpClient: HttpClient) {}

  createPaymentIntent() {
    return this.httpClient
      .post<Basket>(
        `${this.baseUrl}/payment/${this.getCurrentBasketValue()?.id}`,
        {}
      )
      .pipe(
        map((basket) => {
          this.basketSource.next(basket);
        })
      );
  }

  setShippingPrice(deliveryMethod: DeliveryMethod) {
    const basket = this.getCurrentBasketValue();

    if (basket) {
      basket.shippingPrice = deliveryMethod.price;
      basket.deliveryMethodId = deliveryMethod.id;
      this.setBasket(basket);
    }
  }

  getBasket(id: string) {
    let reqParams = new HttpParams();
    reqParams = reqParams.append('id', id);

    return this.httpClient
      .get<Basket>(`${this.baseUrl}/basket`, { params: reqParams })
      .subscribe({
        next: (basket) => {
          this.basketSource.next(basket);
          this.calculateTotals();
        },
      });
  }

  setBasket(basket: Basket) {
    return this.httpClient
      .post<Basket>(`${this.baseUrl}/basket`, basket)
      .subscribe({
        next: (basket) => {
          this.basketSource.next(basket);
          this.calculateTotals();
        },
        error: (err) => console.log(err),
      });
  }

  getCurrentBasketValue() {
    return this.basketSource.value;
  }

  addProductToBasket(item: Product, quantity = 1) {
    const itemToAdd = this.mapProductToBasketItem(item);
    this.addItemToBasket(itemToAdd, quantity);
  }

  addItemToBasket(item: BasketItem, quantity = 1) {
    const basket = this.getCurrentBasketValue() ?? this.createAndStoreBasket();
    this.addOrUpdateItem(basket.items, item, quantity);

    this.setBasket(basket);
  }

  addOrUpdateItem(
    basketItems: BasketItem[],
    itemToAdd: BasketItem,
    quantity: number
  ) {
    const existingItem = basketItems.find((bi) => bi.id === itemToAdd.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      itemToAdd.quantity = quantity;
      basketItems.push(itemToAdd);
    }
  }

  removeItemFromBasket(id: number, quantityToRemove = 1) {
    const basket = this.getCurrentBasketValue();
    if (!basket) return;

    const itemToRemove = basket.items.find((bi) => bi.id === id);
    if (!itemToRemove) return;

    itemToRemove.quantity -= quantityToRemove;
    if (itemToRemove.quantity === 0)
      basket.items = basket.items.filter((bi) => bi.id !== id);

    if (!basket.items.length) {
      this.deleteBasket(basket);
    } else {
      this.setBasket(basket);
    }
  }

  deleteBasket(basket: Basket) {
    let reqParams = new HttpParams();
    reqParams = reqParams.append('id', basket.id);

    this.httpClient
      .delete(`${this.baseUrl}/basket`, { params: reqParams })
      .subscribe({
        next: () => {
          this.deleteLocalBasket();
        },
      });
  }

  private calculateTotals() {
    const basket = this.getCurrentBasketValue();

    if (!basket) return;

    const subtotal = basket.items.reduce((a, b) => b.price * b.quantity + a, 0);
    const total = subtotal + basket.shippingPrice;
    this.basketTotalSource.next({
      shipping: basket.shippingPrice,
      total,
      subtotal,
    });
  }

  private mapProductToBasketItem(item: Product): BasketItem {
    return {
      id: item.id,
      productName: item.name,
      price: item.price,
      quantity: 0,
      pictureUrl: item.pictureUrl,
      brand: item.productBrand,
      type: item.productType,
    };
  }

  private createAndStoreBasket(): Basket {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }

  private deleteLocalBasket() {
    this.basketSource.next(null);
    this.basketTotalSource.next(null);
    localStorage.removeItem('basket_id');
  }
}
