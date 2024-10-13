import { Address } from '../account/address';
import { OrderItem } from './order-item';

export interface Order {
  id: number;
  buyerEmail: string;
  orderDate: string;
  shippingAddress: Address;
  deliveryMethod: string;
  shippingPrice: number;
  orderItems: OrderItem[];
  subtotal: number;
  total: number;
  status: OrderStatus;
}

export enum OrderStatus {
  Pending = 'Pending',
  PaymentReceived = 'PaymentReceived',
  PaymentFailed = 'PaymentFailed',
}
