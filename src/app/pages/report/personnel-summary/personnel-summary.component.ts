import { Component } from '@angular/core';
import { format } from 'date-fns';
import { EMPTY, Subject, catchError, takeUntil, tap } from 'rxjs';
import { LocalServiceConst } from 'src/app/constanta/local-service-constanta';
import { UserDataDTO } from 'src/app/dto/user-data-dto';
import {
  CostCenterType,
  personalSummaryDataTypes,
  personalSummaryTypes,
  selectType,
} from 'src/app/lib/types';
import { CostCenterService } from 'src/app/services/opex/cost-center/cost-center.service';
import { LocalStorageService } from 'src/app/services/opex/local-storage/local-storage.service';
import { ReportService } from 'src/app/services/opex/report/report.service';
import { GetAllUsersService } from 'src/app/services/opex/user/get-all-users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-personnel-summary',
  templateUrl: './personnel-summary.component.html',
  styleUrls: ['./personnel-summary.component.css'],
})
export class PersonnelSummaryComponent {
  isFilterActive: boolean = true;
  dataDinas: selectType[] = [];
  dataRequestBy: selectType[] = [];
  dataResponsible: selectType[] = [];
  userInfo: UserDataDTO = <UserDataDTO>{};
  costCenterData: CostCenterType | null = <CostCenterType>{};
  page: number = 1;
  perPage: number = 10;
  totalSubmissionValue: number = 0;
  status: string = '';
  statusTo: string = '';
  dinas: string = '';
  requestBy: string = '';
  responsibleOfRequest: string = '';
  data!: personalSummaryDataTypes[];
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
  type: string = '';
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
  statusType: string[] = ['OPEN', 'PROGRESS', 'CLOSED', 'REVISE', 'REJECT'];
  activeId: string = 'not-active';
  personalUnit!: string;
  years: string = '';
  month: string = '';
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
  onClick(value: string) {
    if (this.activeId == 'not-active') {
      this.activeId = value;
    } else if (this.activeId != value) {
      this.activeId = value;
    } else {
      this.activeId = 'not-active';
    }
  }
  checkStatus(value: string): boolean {
    if (this.statusType.includes(value)) {
      return true;
    }
    return false;
  }
  constructor(
    private costCenter: CostCenterService,
    private report: ReportService,
    private users: GetAllUsersService,
    private readonly localStorageService: LocalStorageService
  ) {}
  private readonly _onDestroy$: Subject<void> = new Subject<void>();
  ngOnInit(): void {
    this.getDinas();
    this.getUserInfo();
    this.getResponsible();
    this.getRequestBy();
  }
  async getUserInfo(): Promise<void> {
    if (!this.users.getPersonalInformationFromCache()) {
      try {
        let _data = await this.users.getUserInfo();
        this.userInfo = _data;
        this.generateDinas(this.userInfo?.personalUnit);
      } catch {
        Swal.fire({
          title: 'Alert!',
          html: 'failed to get user info',
          // icon: 'success',
          confirmButtonColor: '#1F569D',
        });
      }
    } else {
      let _userInfo: any = {
        ...this.localStorageService.getData(LocalServiceConst.USER_INFO),
      };
      this.userInfo = JSON.parse(_userInfo?._result);
      this.generateDinas(this.userInfo?.personalUnit);
    }
  }
  generateDinas(dinas: string): void {
    this.personalUnit = dinas.slice(0, 2);
    this.getCostCenter(this.personalUnit);
  }
  getCostCenter(bidang: string): void {
    this.costCenter
      .getCostCenterByBidang(bidang)
      .pipe(
        catchError((err) => {
          console.error('Error occurred:', err);
          return EMPTY;
        }),
        tap((result) => {
          if (result) {
            this.costCenterData = result.data[0] as unknown as CostCenterType;
            this.dinas = this.costCenterData?.dinas;
            this.getPersonalSummary();
          }
        }),
        takeUntil(this._onDestroy$)
      )
      .subscribe();
  }
  resetFilter(): void {
    this.years = '';
    this.month = '';
    this.status = '';

    this.dinas = '';
    this.type = '';
    this.requestBy = '';
    this.responsibleOfRequest = '';
    this.page = 1;
    this.getPersonalSummary();
  }
  onChangeYears(val: any) {
    this.years = val.id;
    this.page = 1;
    this.getPersonalSummary();
  }
  onChangeMonth(val: any) {
    this.month = val.id;
    this.page = 1;
    this.getPersonalSummary();
  }
  onChangeDinas(val: any) {
    this.dinas = val.id;
    this.page = 1;
    this.getPersonalSummary();
  }
  onChangeResponsible(val: any) {
    this.responsibleOfRequest = val.id;
    this.page = 1;
    this.getPersonalSummary();
  }
  onChangeRequestBy(val: any) {
    this.requestBy = val.id;
    this.page = 1;
    this.getPersonalSummary();
  }
  onChangeStatus(val: any) {
    this.status = val.id;
    this.page = 1;
    this.getPersonalSummary();
  }
  onChangeType(val: any) {
    this.type = val.id;
    this.page = 1;
    this.getPersonalSummary();
  }
  onPageChange(page: number) {
    this.page = page;
    // this.createArray(this.meta.last_page, this.page, 3);
    this.getPersonalSummary();
  }

  getDinas() {
    this.costCenter
      .getDinas()
      .pipe(
        catchError((err) => {
          console.error('Error occurred:', err);
          return EMPTY;
        }),
        tap((result: any) => {
          if (result && result.data) {
            // Ensure result.data is a single array of glAccountType objects

            this.dataDinas = this.refactorArray(result.data);
          }
        }),
        takeUntil(this._onDestroy$)
      )
      .subscribe();
  }
  getResponsible() {
    this.report
      .getResponsible()
      .pipe(
        catchError((err) => {
          console.error('Error occurred:', err);
          return EMPTY;
        }),
        tap((result: any) => {
          if (result && result.data) {
            // Ensure result.data is a single array of glAccountType objects

            this.dataResponsible = this.refactorArray(result.data);
          }
        }),
        takeUntil(this._onDestroy$)
      )
      .subscribe();
  }
  getRequestBy() {
    this.report
      .getRequestBy()
      .pipe(
        catchError((err) => {
          console.error('Error occurred:', err);
          return EMPTY;
        }),
        tap((result: any) => {
          if (result && result.data) {
            // Ensure result.data is a single array of glAccountType objects

            this.dataRequestBy = this.refactorArray(result.data);
          }
        }),
        takeUntil(this._onDestroy$)
      )
      .subscribe();
  }
  refactorArray(data: string[]): selectType[] {
    return data.map((item) => {
      return {
        id: item,
        value: item,
      };
    });
  }
  formatDate(val: Date): string {
    return format(new Date(val), 'dd MMM yyyy');
  }
  getPersonalSummary() {
    this.report
      .getPersonalSummaryByFilter(
        this.page,
        `${this.dinas != '' ? '&dinas=' + this.dinas : ''}`,
        `${this.month != '' ? '&month=' + this.month : ''}`,
        `${this.years != '' ? '&years=' + this.month : ''}`,
        `${this.type != '' ? '&type=' + this.type : ''}`,
        `${this.status != '' ? '&status=' + this.status : ''}`,

        `${this.requestBy != '' ? '&requestBy=' + this.requestBy : ''}`,
        `${
          this.responsibleOfRequest != ''
            ? '&responsibleOfRequest=' + this.responsibleOfRequest
            : ''
        }`
      )
      .pipe(
        catchError((err) => {
          console.error('Error occurred:', err);
          return EMPTY;
        }),
        tap((result: any) => {
          if (result && result.data) {
            // Ensure result.data is a single array of glAccountType objects
            const allData = result.data.data;
            const meta = result.meta;
            this.meta = meta;
            this.totalSubmissionValue = result.data.totalSubmissionValue;
            this.data = allData;
          }
        }),
        takeUntil(this._onDestroy$)
      )
      .subscribe();
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
