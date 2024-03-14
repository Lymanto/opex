import { Component, OnInit } from '@angular/core';
import { format } from 'date-fns';
import { Modal } from 'flowbite';
import { EMPTY, Subject, catchError, of, takeUntil, tap } from 'rxjs';
import { Flowbite } from 'src/app/lib/flowbite';
import { kursType, selectType } from 'src/app/lib/types';
import { KursUsdService } from 'src/app/services/opex/master-data/kurs-usd.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-kurs-usd',
  templateUrl: './kurs-usd.component.html',
  styleUrls: ['./kurs-usd.component.css'],
})
@Flowbite()
export class KursUsdComponent implements OnInit {
  yearsSelected!: number;
  inputValue!: number;
  tableData: kursType[] = [];
  currentYear: string = format(new Date(), 'yyyy');
  console = console;
  errorMessage: any;
  selectedKurs!: any;
  page: number = 1;
  perPage: number = 10;
  meta: {
    lastpage: number;
    totalItemsPerPage: number;
    totalItems: number;
    currentPage: number;
  } = {
    lastpage: 0,
    totalItemsPerPage: 0,
    totalItems: 0,
    currentPage: 0,
  };
  alert = alert;
  yearsData: selectType[] = [
    {
      id: (parseInt(this.currentYear) + 1).toString(),
      value: (parseInt(this.currentYear) + 1).toString(),
    },
    {
      id: this.currentYear,
      value: this.currentYear,
    },
  ];

  private readonly _onDestroy$: Subject<void> = new Subject<void>();
  constructor(private kurs: KursUsdService) {}
  generateYears(): void {
    for (let i = 1; i <= 10; i++) {
      this.yearsData.push({
        id: (parseInt(this.currentYear) - i).toString(),
        value: (parseInt(this.currentYear) - i).toString(),
      });
    }
  }
  getValueSelectBox(val: any): void {
    this.yearsSelected = parseInt(val.id);
  }
  getValueInputText(val: string): void {
    this.inputValue = parseInt(val);
  }
  kursAddPost(years: number, value: number, createdBy: string): void {
    this.kurs
      .postKurs({
        years,
        value,
        createdBy,
      })
      .pipe(
        catchError((error: any) => {
          this.errorMessage = error.message;
          this.console.error('There was an error!', error);

          Swal.fire('', error.error.message, 'error');
          return of();
        })
      )
      .subscribe(
        (data: kursType) => {
          this.getKurs();
          Swal.fire('', 'Add new kurs Success', 'success');
        },
        (error: any) => {
          this.console.error('Error', error);
        }
      );
  }
  kursEditPut(
    value: number,
    updatedBy: string,
    idKurs: number | undefined
  ): void {
    this.kurs
      .editKurs({
        idKurs,
        value,
        updatedBy,
      })
      .pipe(
        catchError((error: any) => {
          this.errorMessage = error.message;
          this.console.error('There was an error!', error);

          return of();
        })
      )
      .subscribe(
        (data: kursType) => {
          this.getKurs();
          const elKurs: HTMLElement = document.querySelector(
            '#kursEdit'
          ) as HTMLElement;
          const modal = new Modal(elKurs);
          modal.hide();
          document.querySelector('body > div[modal-backdrop]')?.remove();
          this.selectedKurs = {};
          Swal.fire('', 'Update Success', 'success');
        },
        (error: any) => {
          this.console.error('Error', error);
        }
      );
  }
  getKurs() {
    return this.kurs
      .getAllKurs(this.page, this.perPage)
      .pipe(
        catchError((err) => {
          console.error('Error occurred', err);
          return EMPTY;
        }),
        tap((result: { data: any[]; meta: any }) => {
          if (result && result.data) {
            // Ensure result.data is a single array of glAccountType objects
            this.tableData = result.data.flatMap((item) => item); // Convert array of arrays to a single array
            const meta = result.meta;
            this.meta = meta;
          }
        }),
        takeUntil(this._onDestroy$)
      )
      .subscribe();
  }
  kursEditOpen(item: kursType) {
    const elKurs: HTMLElement = document.querySelector(
      '#kursEdit'
    ) as HTMLElement;
    const modal = new Modal(elKurs);
    this.selectedKurs = item;
    modal.show();
  }
  kursEditClose() {
    const elKurs: HTMLElement = document.querySelector(
      '#kursEdit'
    ) as HTMLElement;
    const modal = new Modal(elKurs);
    modal.hide();
    document.querySelector('body > div[modal-backdrop]')?.remove();
    this.selectedKurs = {};
  }
  onPageChange(page: number) {
    this.page = page;
    this.getKurs();
  }
  ngOnInit() {
    this.generateYears();
    this.getKurs();
  }
}
