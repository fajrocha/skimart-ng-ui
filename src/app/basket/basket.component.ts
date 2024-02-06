import { Component } from '@angular/core';
import { BasketService } from './basket.service';
import { Basket } from '../shared/models/basket/basket';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { log } from '@angular-devkit/build-angular/src/builders/ssr-dev-server';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss',
})
export class BasketComponent {
  constructor() {}
}
