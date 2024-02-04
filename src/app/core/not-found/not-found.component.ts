import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [],
  template: `<div class="container text-secondary">
    <div class="row">
      <div class="col-12 text-center">
        <img src="assets/images/falling-snowboard.svg" class="w-50" alt="" />
        <h1 class="app-text-shadow-sm error-primary">Resource not found!</h1>
      </div>
    </div>
  </div>`,
  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {}
