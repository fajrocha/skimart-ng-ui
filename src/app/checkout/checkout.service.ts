import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { DeliveryMethod } from '../shared/models/delivery/delivery-method';
import { OrderToCreate } from '../shared/models/order/order-to-create';
import { Order } from '../shared/models/order/order';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  createOrder(order: OrderToCreate) {
    return this.httpClient.post<Order>(`${this.baseUrl}/orders`, order);
  }

  getDeliveryMethods() {
    return this.httpClient
      .get<DeliveryMethod[]>(`${this.baseUrl}/orders/deliveryMethods`)
      .pipe(
        map((dm) => {
          return dm.sort((a, b) => b.price - a.price);
        })
      );
  }
}
