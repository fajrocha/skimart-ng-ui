import { Component } from '@angular/core';

@Component({
  selector: 'app-server-error',
  standalone: true,
  imports: [],
  template: `<div
    class="container d-flex justify-content-center align-items-center error-primary"
  >
    <i class="bi bi-outlet app-text-shadow-md"></i>
    <h1 class="app-text-shadow-sm">Oh no! Error at the server</h1>
  </div>`,
  styleUrl: './server-error.component.scss',
})
export class ServerErrorComponent {}
