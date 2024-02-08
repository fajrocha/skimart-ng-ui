import {
  Component,
  EventEmitter,
  Input,
  NgModule,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PageChangedEvent, PaginationModule } from 'ngx-bootstrap/pagination';

interface PagerProps {
  totalCount: number;
  pageSize: number;
  pageIndex: number;
}

@Component({
  selector: 'app-pager',
  standalone: true,
  imports: [PaginationModule, FormsModule],
  templateUrl: './pager.component.html',
  styleUrl: './pager.component.scss',
})
export class PagerComponent {
  @Input() props: PagerProps = {} as PagerProps;
  @Output() pageChanged = new EventEmitter<number>();

  onPagerChanged(event: PageChangedEvent) {
    this.pageChanged.emit(event.page);
  }
}
