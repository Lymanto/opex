import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { format } from 'date-fns';
import { EMPTY, Subject, catchError, takeUntil, tap } from 'rxjs';
import { LocalServiceConst } from 'src/app/constanta/local-service-constanta';
import { UserDataDTO } from 'src/app/dto/user-data-dto';
import {
  CostCenterType,
  RKAPType,
  ViewBudgetMasterData,
  glAccountType,
  selectType,
} from 'src/app/lib/types';
import { CostCenterService } from 'src/app/services/opex/cost-center/cost-center.service';
import { NewRequestService } from 'src/app/services/opex/dashboard/new-request.service';
import { LocalStorageService } from 'src/app/services/opex/local-storage/local-storage.service';
import { ViewBudgetService } from 'src/app/services/opex/master-data/view-budget.service';
import { ReportService } from 'src/app/services/opex/report/report.service';
import { GetAllUsersService } from 'src/app/services/opex/user/get-all-users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-budget',
  templateUrl: './view-budget.component.html',
  styleUrls: ['./view-budget.component.css'],
})
export class ViewBudgetComponent implements OnInit {
  data: any = [];
  months: string[] = [
    'JANUARI',
    'FEBRUARI',
    'MARET',
    'APRIL',
    'MEI',
    'JUNI',
    'JULI',
    'AGUSTUS',
    'SEPTEMBER',
    'OKTOBER',
    'NOVEMBER',
    'DESEMBER',
  ];

  yearsSelected: number = new Date().getFullYear();
  currentYear: string = format(new Date(), 'yyyy');
  userInfo: UserDataDTO = <UserDataDTO>{};
  dataRKAP: RKAPType[] = [];
  dataActual: RKAPType[] = [];
  dataRemaining: RKAPType[] = [];
  isDisplayRkap: boolean = true;
  isDisplayRemaining: boolean = true;
  isDisplayActual: boolean = true;
  activeIdRKAP: string | number = 'not-active';
  activeIdActual: string | number = 'not-active';
  activeIdRemaining: string | number = 'not-active';
  costCenterData: CostCenterType | null = <CostCenterType>{};
  personalUnit!: string;
  headers: string[] = [
    'Financial Indicator',
    'G/L Number',
    'Total',
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'Mei',
    'Jun',
    'Jul',
    'Agu',
    'Sep',
    'Okt',
    'Nov',
    'Des',
  ];

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
  generateYears(): void {
    for (let i = 1; i <= 1; i++) {
      this.yearsData.push({
        id: (parseInt(this.currentYear) - i).toString(),
        value: (parseInt(this.currentYear) - i).toString(),
      });
    }
  }
  getValueSelectBox(val: any): void {
    this.yearsSelected = parseInt(val.id);
    this.getRKAP();
  }
  selectGroupData: selectType[] = [];
  selectGroupDetailData: selectType[] = [];
  isGroupSelected: boolean = false;
  dataGL!: glAccountType[];
  dataBudget!: any;
  constructor(
    private service: NewRequestService,
    private viewBudget: ReportService,
    private users: GetAllUsersService,
    private costCenter: CostCenterService,
    private report: ReportService,
    private readonly localStorageService: LocalStorageService
  ) {}

  private readonly _onDestroy$: Subject<void> = new Subject<void>();

  ngOnInit() {
    this.fetchGlAccount();
    this.generateYears();
    this.getUserInfo();
  }

  async getUserInfo(): Promise<void> {
    if (!this.users.getPersonalInformationFromCache()) {
      try {
        let _data = await this.users.getUserInfo();
        this.userInfo = _data;
      } catch {
        Swal.fire({
          title: 'Alert!',
          html: 'failed to get user info',
          // icon: 'success',
          confirmButtonColor: '#276BC5',
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
            this.getRKAP();
          }
        }),
        takeUntil(this._onDestroy$)
      )
      .subscribe();
  }
  generateDinas(dinas: string): void {
    this.personalUnit = dinas.slice(0, 2);
    this.getCostCenter(this.personalUnit);
  }

  getRKAP(): void {
    this.dataRKAP = [];
    this.viewBudget
      .getBudgetByFilter(
        this.yearsSelected.toString(),
        `&costCenter=${this.costCenterData?.dinas}`
      )
      .pipe(
        catchError((err) => {
          console.error('Error occurred:', err);
          return EMPTY;
        }),
        tap((result) => {
          if (result) {
            // Ensure result.data is a single array of glAccountType objects
            const allData = result as unknown as ViewBudgetMasterData; // Convert array of arrays to a single array
            this.dataRKAP = allData.budget as unknown as RKAPType[];
            this.dataActual = allData.actual as unknown as RKAPType[];
            this.dataRemaining = allData.remaining as unknown as RKAPType[];
          }
        }),
        takeUntil(this._onDestroy$)
      )
      .subscribe();
  }

  onClickRKAP(value: string | number) {
    if (this.activeIdRKAP == 'not-active') {
      this.activeIdRKAP = value;
    } else if (this.activeIdRKAP != value) {
      this.activeIdRKAP = value;
    } else {
      this.activeIdRKAP = 'not-active';
    }
  }
  onClickActual(value: string | number) {
    if (this.activeIdActual == 'not-active') {
      this.activeIdActual = value;
    } else if (this.activeIdActual != value) {
      this.activeIdActual = value;
    } else {
      this.activeIdActual = 'not-active';
    }
  }
  onClickRemaining(value: string | number) {
    if (this.activeIdRemaining == 'not-active') {
      this.activeIdRemaining = value;
    } else if (this.activeIdRemaining != value) {
      this.activeIdRemaining = value;
    } else {
      this.activeIdRemaining = 'not-active';
    }
  }
  toString(value: number): string {
    return value.toString();
  }
  currencyFormat(val: number): string {
    let USDollar = new Intl.NumberFormat('en-US');
    return USDollar.format(val);
  }
  fetchGlAccount(): void {
    this.service
      .getAllGroup()
      .pipe(
        catchError((err) => {
          console.error('Error occurred:', err);
          return EMPTY;
        }),
        tap((result) => {
          if (result && result.data) {
            // Ensure result.data is a single array of glAccountType objects
            const allData = result.data.flatMap((item) => item); // Convert array of arrays to a single array

            this.refactorSelectGroupData(allData);
          }
        }),
        takeUntil(this._onDestroy$)
      )
      .subscribe();
  }
  getValueMTDYTD(val: any): void {
    let temp = this.dataGL.filter((item) => item.glAccount == val.id);
    this.report
      .getBudgetMTDYTD(
        this.costCenterData?.dinas as string,
        temp[0].groupGl,
        val.value
      )
      .pipe(
        catchError((err) => {
          console.error('Error occurred', err);
          return EMPTY;
        }),
        tap((result: { data: any }) => {
          if (result && result.data) {
            this.dataBudget = result.data;
            console.log(this.dataBudget);
          }
        }),
        takeUntil(this._onDestroy$)
      )
      .subscribe();
  }
  getValueGLItem(val: any): void {
    this.isGroupSelected = true;
    this.service
      .getAllGroupGL(val.value)
      .pipe(
        catchError((err) => {
          console.error('Error occurred', err);
          return EMPTY;
        }),
        tap((result: { data: any }) => {
          if (result && result.data) {
            const allData = result.data.flatMap((item: any) => item);
            this.selectGroupDetailData = [];
            this.dataGL = result.data;
            this.refactorSelectGroupDetailData(allData);
          }
        }),
        takeUntil(this._onDestroy$)
      )
      .subscribe();
  }
  refactorSelectGroupData(data: any): void {
    data.forEach((element: any, index: number) => {
      this.selectGroupData.push({
        id: index,
        value: element,
      });
    });
  }
  refactorSelectGroupDetailData(data: glAccountType[]): void {
    data.forEach((element: glAccountType, index: number) => {
      this.selectGroupDetailData.push({
        id: element.glAccount,
        value: element.groupDetail,
      });
    });
  }
}
