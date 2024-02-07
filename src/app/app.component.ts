import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SectionHeaderComponent } from './shared/section-header/section-header.component';
import { BasketService } from './basket/basket.service';

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

  ngOnInit() {
    this.loadBasket();
  }

  private loadBasket() {
    const basketId = localStorage.getItem('basket_id');
    if (basketId) this.basketService.getBasket(basketId);
  }
}
