import { BasketItem } from './basket-item';
import { createId } from '@paralleldrive/cuid2';

export interface Basket {
  id: string;
  items: BasketItem[];
  clientSecret?: string;
  shippingPrice: number;
  paymentIntentId?: string;
  deliveryMethodId?: number;
}

export class Basket implements Basket {
  id = createId();
  items: BasketItem[] = [];
  shippingPrice = 0;
}
