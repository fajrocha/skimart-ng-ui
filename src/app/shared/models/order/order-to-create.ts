import { Address } from '../account/address';

export interface OrderToCreate {
  basketId: string;
  deliveryMethodId: string;
  shippingAddress: Address;
}
