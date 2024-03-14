import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent {
  @Input() numberOfItems!: number;
  @Input() itemsPerPage!: number;
  @Input() currentPage: number = 1;
  @Input() loop: boolean = false;

  // emits the current page number
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  /**
   * number of pages is calculated by number of items and items per page
   * pages is an array that holds the actual values for the pagination
   */
  numberOfPages: number = 0;
  pages: Array<number | null> = [];
  console = console;
  constructor() {}

  // when input changes, update the pagination
  ngOnChanges() {
    this.numberOfPages = Math.ceil(this.numberOfItems / this.itemsPerPage);
    this.updatePages();

    if (this.currentPage > this.numberOfPages) {
      this.goToPage(1);
    }
  }

  // fills the pages array with the actual numbers
  private updatePages(): void {
    // if there are no pages create an emtpy array

    if (this.numberOfPages === 0) {
      this.pages = [];
      return;
    }

    // if all pages fit into the view simply create an array
    if (this.numberOfPages < 12) {
      this.pages = Array.from({ length: this.numberOfPages }, (v, k) => ++k);
      return;
    }

    // if there are more pages then fit into the view
    this.pages = [];
    // add first page
    this.pages.push(1);

    // get start value for the elements in the middle
    const start =
      this.currentPage < 6
        ? 2
        : this.currentPage > this.numberOfPages - 5
        ? this.numberOfPages - 9
        : this.currentPage - 4;
    const end = start + 9;

    // loop through all items in the middle (except first and last page)
    for (let i = start; i < end; i++) {
      if (i < this.currentPage) {
        break;
      }
      if (i < this.numberOfPages - 1) {
        break;
      }
      // if the second or second to last page are "not connected", add `null` instead of the page nmber
      // null will be replaced with '...' in the template
      if (
        (i === start && this.currentPage > 6) ||
        (i === end - 1 && this.currentPage < this.numberOfPages - 5)
      ) {
        this.pages.push(null);
        continue;
      }

      this.pages.push(i);
    }
    // add last page
    // this.pages.push(this.numberOfPages);
  }

  onPageChange(): void {
    this.updatePages();
    this.pageChange.emit(this.currentPage);
  }

  // goes directly to a page number
  goToPage(page: number): void {
    this.currentPage = page;
    this.onPageChange();
  }

  // goes to the previous page
  goToPrevPage(): void {
    const next = this.currentPage - 1;

    if (next > 0) {
      this.goToPage(next);
      return;
    }

    if (this.loop === false) {
      return;
    }

    this.goToPage(this.numberOfPages);
  }

  // goes to the next page
  goToNextPage(): void {
    const next = this.currentPage + 1;

    if (next <= this.numberOfPages) {
      this.goToPage(next);
      return;
    }

    if (this.loop === false) {
      return;
    }

    this.goToPage(1);
  }
}
