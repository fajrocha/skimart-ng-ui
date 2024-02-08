import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';
import { BasketService } from '../../../basket/basket.service';
import { BasketItem } from '../../models/basket/basket-item';
import { AccountService } from '../../../account/account.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, NgIf, AsyncPipe, BsDropdownModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(
    public basketService: BasketService,
    public accountService: AccountService
  ) {}

  getBasketCount(items: BasketItem[]) {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }

  protected readonly BasketService = BasketService;
}
