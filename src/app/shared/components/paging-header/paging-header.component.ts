import { Component, Input } from '@angular/core';

interface PagingHeaderProps {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
}

@Component({
  selector: 'app-paging-header',
  standalone: true,
  imports: [],
  templateUrl: './paging-header.component.html',
  styleUrl: './paging-header.component.scss',
})
export class PagingHeaderComponent {
  @Input() props: PagingHeaderProps = {} as PagingHeaderProps;

  get leftSide() {
    const { pageIndex, pageSize } = this.props;

    return (pageIndex - 1) * pageSize + 1;
  }

  get rightSide() {
    const { pageIndex, pageSize, totalCount } = this.props;

    return pageIndex * pageSize > totalCount
      ? totalCount
      : pageIndex * pageSize;
  }
}
