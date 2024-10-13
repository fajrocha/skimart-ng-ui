import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SectionHeaderComponent } from './shared/components/section-header/section-header.component';
import { BasketService } from './basket/basket.service';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { AccountService } from './account/account.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    NgxSpinnerModule,
    SectionHeaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  basketService = inject(BasketService);
  accountService = inject(AccountService);

  ngOnInit() {
    this.loadBasket();
    this.loadUser();
  }

  private loadBasket() {
    const basketId = localStorage.getItem('basket_id');
    if (basketId) this.basketService.getBasket(basketId);
  }

  private loadUser() {
    const token = localStorage.getItem('token');

    this.accountService.loadCurrentUser(token).subscribe();
  }
}
