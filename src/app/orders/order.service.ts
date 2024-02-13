import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Order } from '../shared/models/order/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  baseUrl = environment.apiUrl;
  httpClient = inject(HttpClient);

  getOrdersForUser() {
    return this.httpClient.get<Order[]>(`${this.baseUrl}/orders`);
  }

  getOrderById(id: number) {
    return this.httpClient.get<Order>(`${this.baseUrl}/orders/${id}`);
  }
}
