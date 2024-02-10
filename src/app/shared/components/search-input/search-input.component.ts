import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss',
})
export class SearchInputComponent {
  private productIdSearch = new Subject<string>();
  @Input() placeholder = '';
  @Output() textChange = new EventEmitter<string>();

  ngOnInit() {
    this.productIdSearch
      .pipe(debounceTime(250), distinctUntilChanged())
      .subscribe((searchValue) => this.textChange.emit(searchValue));
  }

  onChange(event: Event) {
    const searchValue = (event.target as HTMLInputElement).value;
    this.productIdSearch.next(searchValue);
  }
}
