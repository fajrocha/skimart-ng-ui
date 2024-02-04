import { AsyncPipe, CommonModule, NgIf, TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { BreadcrumbModule, BreadcrumbService } from '@luhuiguo/xng-breadcrumb';

@Component({
  selector: 'app-section-header',
  standalone: true,
  imports: [BreadcrumbModule, NgIf, TitleCasePipe, AsyncPipe],
  templateUrl: './section-header.component.html',
  styleUrl: './section-header.component.scss',
})
export class SectionHeaderComponent {
  constructor(public bcService: BreadcrumbService) {}
}
