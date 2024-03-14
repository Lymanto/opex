import { Component, Input, OnInit } from '@angular/core';
import { format } from 'date-fns';
import { EMPTY, Subject, catchError, takeUntil, tap } from 'rxjs';
import { selectType } from 'src/app/lib/types';
import { NewRequestService } from 'src/app/services/opex/dashboard/new-request.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  isFilterActive: boolean = true;
  data!: any[];
  dataPercentage!: any[];
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
  show: boolean = false;
  activeId: string = 'not-active';
  page: number = 1;
  perPage: number = 10;
  years: string = '';
  requestNumber: string = '';
  status: string = '';
  type: string = '';
  dinas: string = '';
  entryDateFrom: string = '';
  entryDateTo: string = '';
  statusType: string[] = ['OPEN', 'PROGRESS', 'CLOSE', 'REVISE', 'REJECT'];

  constructor(private requestData: NewRequestService) {}
  private readonly _onDestroy$: Subject<void> = new Subject<void>();
  dataYears: selectType[] = [
    {
      id: new Date().getFullYear(),
      value: new Date().getFullYear().toString(),
    },
    {
      id: new Date().getFullYear() - 1,
      value: (new Date().getFullYear() - 1).toString(),
    },
    {
      id: new Date().getFullYear() - 2,
      value: (new Date().getFullYear() - 2).toString(),
    },
  ];
  dataDinas: selectType[] = [
    {
      id: 'TA',
      value: 'TA',
    },
    {
      id: 'TD',
      value: 'TD',
    },
  ];
  dataStatus: selectType[] = [
    {
      id: 'REJECT',
      value: 'Reject',
    },
    {
      id: 'OPEN',
      value: 'Open',
    },
    {
      id: 'CLOSE',
      value: 'Close',
    },
    {
      id: 'REVISE',
      value: 'Revise',
    },
    {
      id: 'PROGRESS',
      value: 'Progress',
    },
  ];
  dataType: selectType[] = [
    {
      id: 'UANG_MUKA',
      value: 'Uang Muka',
    },
    {
      id: 'PENGADAAN',
      value: 'Pengadaaan',
    },
    {
      id: 'QUALITY',
      value: 'Quality',
    },
    {
      id: 'FACILITY',
      value: 'Facility',
    },
    {
      id: 'ICT',
      value: 'ICT',
    },
    {
      id: 'ENTERTAINMENT',
      value: 'Entertainment',
    },
    {
      id: 'REIMBURSEMENT',
      value: 'Reimbursement',
    },
  ];
  ngOnInit(): void {
    this.getDataTable();
    this.getDataPercentage();
  }

  checkStatus(value: string): boolean {
    if (this.statusType.includes(value)) {
      return true;
    }
    return false;
  }
  onShowDetail(value: string) {
    if (this.activeId == 'not-active') {
      this.activeId = value;
    } else if (this.activeId != value) {
      this.activeId = value;
    } else {
      this.activeId = 'not-active';
    }
  }
  resetFilter(): void {
    this.years = '';
    this.requestNumber = '';
    this.status = '';
    this.type = '';
    this.dinas = '';
    this.page = 1;
    this.getDataTable();
  }
  onChangeYears(val: any) {
    this.years = val.id;
    this.page = 1;
    this.getDataTable();
  }
  onChangeType(val: any) {
    this.type = val.id;
    this.page = 1;
    this.getDataTable();
  }
  onChangeDinas(val: any) {
    this.dinas = val.id;
    this.page = 1;
    this.getDataTable();
  }
  onChangeStatus(val: any) {
    this.status = val.id;
    this.page = 1;
    this.getDataTable();
  }
  onChangeRequestNumber(val: string) {
    this.page = 1;
    this.requestNumber = val;
    this.getDataTable();
  }
  onPageChange(page: number) {
    this.page = page;
    // this.createArray(this.meta.last_page, this.page, 3);
    this.getDataTable();
  }
  onChangeEntryDateFrom(val: string): void {
    this.entryDateFrom = val;
    this.page = 1;
    this.getDataTable();
  }
  onChangeEntryDateTo(val: string): void {
    this.entryDateTo = val;
    this.page = 1;
    this.getDataTable();
  }
  formatDate(val: Date): string {
    return format(new Date(val), 'dd MMM yyyy');
  }

  getDataPercentage() {
    this.requestData
      .getPercentage()
      .pipe(
        catchError((err) => {
          console.error('Error occurred:', err);
          return EMPTY;
        }),
        tap((result: any) => {
          if (result && result.data) {
            this.dataPercentage = result.data;
          }
        }),
        takeUntil(this._onDestroy$)
      )
      .subscribe();
  }

  getDataTable() {
    this.requestData
      .getAllRealization(
        this.page,
        this.perPage,
        `${this.years != '' ? '&years=' + this.years : ''}`,
        `${
          this.requestNumber != '' ? '&requestNumber=' + this.requestNumber : ''
        }`,
        `${this.status != '' ? '&status=' + this.status : ''}`,
        `${this.type != '' ? '&type=' + this.type : ''}`,
        `${this.dinas != '' ? '&dinas=' + this.dinas : ''}`,
        `${this.entryDateFrom != '' ? '&entryDate=' + this.entryDateFrom : ''}`,
        `${this.entryDateTo != '' ? '&entryDateTo=' + this.entryDateTo : ''}`
      )
      .pipe(
        catchError((err) => {
          console.error('Error occurred:', err);
          return EMPTY;
        }),
        tap((result: any) => {
          if (result && result.data) {
            // Ensure result.data is a single array of glAccountType objects
            const allData = result.data.flatMap((item: any) => item);
            const meta = result.meta;
            this.meta = meta;
            this.data = allData;
          }
        }),
        takeUntil(this._onDestroy$)
      )
      .subscribe();
  }
  typeSubmission(val: string): string {
    switch (val) {
      case 'UANG_MUKA':
        return 'Uang Muka';
      case 'PENGADAAN':
        return 'Pengadaan';
      case 'QUALITY':
        return 'Quality';
      case 'FACILITY':
        return 'Facility';
      case 'ICT':
        return 'ICT';
      case 'ENTERTAINMENT':
        return 'Entertainment';
      case 'REIMBURSEMENT':
        return 'Reimbursement';
      default:
        return 'none';
    }
  }
}
