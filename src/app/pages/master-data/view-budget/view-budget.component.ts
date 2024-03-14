import { Component, Input, OnInit } from '@angular/core';
import { format } from 'date-fns';
import { EMPTY, Subject, catchError, takeUntil, tap } from 'rxjs';
import { UserDataDTO } from 'src/app/dto/user-data-dto';
import {
  glAccountType,
  selectType,
  RKAPType,
  CostCenterType,
  ViewBudgetMasterData,
} from 'src/app/lib/types';
import { NewRequestService } from 'src/app/services/opex/dashboard/new-request.service';
import { ViewBudgetService } from 'src/app/services/opex/master-data/view-budget.service';
import { GetAllUsersService } from 'src/app/services/opex/user/get-all-users.service';
import { LocalStorageService } from 'src/app/services/opex/local-storage/local-storage.service';
import { LocalServiceConst } from 'src/app/constanta/local-service-constanta';
import Swal from 'sweetalert2';
import { CostCenterService } from 'src/app/services/opex/cost-center/cost-center.service';

@Component({
  selector: 'app-view-budget',
  templateUrl: './view-budget.component.html',
  styleUrls: ['./view-budget.component.css'],
})
export class ViewBudgetComponent implements OnInit {
  console = console;
  isDisabledSimulate: boolean = true;
  simulatedData: any = [];
  simulatedArrayData: any[] = [];
  data: any = [];
  percentageNumber: number = 0;
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
  personalUnit!: string;
  yearsSelected: number = new Date().getFullYear();
  currentYear: string = format(new Date(), 'yyyy');
  isUploadSuccess: boolean = false;
  isUploadError: boolean = false;
  uploadError: string = '';
  uploadedFile: File | null = null;
  userInfo: UserDataDTO = <UserDataDTO>{};
  fileSize: string = '';
  dataRKAP: RKAPType[] = [];
  dataActual: RKAPType[] = [];
  dataRemaining: RKAPType[] = [];
  isDisplayRkap: boolean = true;
  isDisplayRemaining: boolean = true;
  isDisplayActual: boolean = true;
  activeIdRKAP: string | number = 'not-active';
  activeIdActual: string | number = 'not-active';
  activeIdRemaining: string | number = 'not-active';
  renderer: any;
  costCenterSelected: string = '';
  costCenterData: CostCenterType | null = <CostCenterType>{};
  dataDinas: selectType[] = [];
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
  }
  onChangeYears(val: any): void {
    this.yearsSelected = parseInt(val.id);
  }
  onChangeDinas(val: any): void {
    this.costCenterSelected = val.id;
    this.getRKAP();
  }
  selectGroupData: selectType[] = [];
  selectGroupDetail: selectType[] = [];

  constructor(
    private service: NewRequestService,
    private costCenter: CostCenterService,
    private viewBudget: ViewBudgetService,
    private users: GetAllUsersService,
    private readonly localStorageService: LocalStorageService
  ) {}

  private readonly _onDestroy$: Subject<void> = new Subject<void>();

  ngOnInit() {
    this.fetchGlAccount();
    this.generateYears();
    this.getUserInfo();
    this.getRKAP();
    this.getDinas();
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
  refactorArray(data: string[]): selectType[] {
    return data.map((item) => {
      return {
        id: item,
        value: item,
      };
    });
  }
  async getUserInfo(): Promise<void> {
    if (!this.users.getPersonalInformationFromCache()) {
      try {
        let _data = await this.users.getUserInfo();
        this.userInfo = _data;
        // this.generateDinas(this.userInfo?.personalUnit);
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
      // this.generateDinas(this.userInfo?.personalUnit);
    }
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
            const filteredData: glAccountType[] = allData.reduce(
              (accumulator: any, current: any) => {
                if (
                  !accumulator.find(
                    (item: any) => item.groupGl === current.groupGl
                  )
                ) {
                  accumulator.push(current);
                }
                return accumulator;
              },
              []
            );

            this.refactorSelectGroupData(filteredData);
            this.refactorSelectGroupDetail(filteredData);
          }
        }),
        takeUntil(this._onDestroy$)
      )
      .subscribe();
  }
  getRKAP(): void {
    this.viewBudget
      .getRKAPByFilter(
        this.yearsSelected.toString(),

        this.costCenterSelected != ''
          ? `&dinas=${this.costCenterSelected}`
          : '',
        `&percentage=${this.percentageNumber.toString()}`
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
  refactorSelectGroupData(data: glAccountType[]): void {
    data.forEach((element: glAccountType) => {
      this.selectGroupData.push({
        id: element.glAccount,
        value: element.groupGl,
      });
    });
  }
  refactorSelectGroupDetail(data: glAccountType[]): void {
    data.forEach((element: glAccountType) => {
      this.selectGroupDetail.push({
        id: element.glAccount,
        value: element.groupDetail,
      });
    });
  }
  uploadFile(event: any): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.uploadedFile = fileInput.files[0];
    }
    if (this.uploadedFile) {
      const bytes = this.uploadedFile.size;
      const maxSize = 1048576; // 1 MB limit
      if (bytes > maxSize) {
        this.fileSize = 'File size exceeds the maximum limit of 1 MB';
        this.isUploadError = true;
        this.uploadError =
          'Upload error, file size exceeds the maximum limit of 1 MB';
        this.isUploadSuccess = false;
      } else {
        this.fileSize = this.generateSize(bytes);
        this.isUploadError = false;
        this.isUploadSuccess = true;
      }
    } else {
      console.warn('No file selected.');
    }
  }
  saveRKAP(): void {
    if (this.uploadedFile === null || this.uploadedFile === undefined) {
      Swal.fire({
        title: 'Alert!',
        html: 'Please select file',
        icon: 'error',
        confirmButtonColor: '#276BC5',
      });
      return;
    }
    if (this.yearsSelected === undefined || this.yearsSelected === null) {
      Swal.fire({
        title: 'Alert!',
        html: 'Please select year',
        icon: 'error',
        confirmButtonColor: '#276BC5',
      });
      return;
    }
    let formData = new FormData();

    formData.append('years', this.yearsSelected.toString());
    formData.append('file', this.uploadedFile);
    formData.append('createdBy', this.userInfo?.personalNumber.toString());

    this.viewBudget
      .postRKAP(formData)
      .pipe(
        catchError((err) => {
          console.error('Error occurred:', err);
          Swal.fire({
            title: 'Alert!',
            html: 'failed to upload RKAP',
            icon: 'error',
            confirmButtonColor: '#276BC5',
          });
          return EMPTY;
        }),
        tap((result) => {
          if (result) {
            this.isUploadSuccess = true;
            this.isUploadError = false;
            this.uploadError = '';
            this.uploadedFile = null;
            this.fileSize = '';

            this.dataRKAP = result.data;

            Swal.fire({
              title: 'Success!',
              html: 'RKAP uploaded successfully',
              icon: 'success',
              confirmButtonColor: '#276BC5',
            });
          }
        }),
        takeUntil(this._onDestroy$)
      )
      .subscribe();
  }
  generateSize(bytes: number): string {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
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
            this.costCenterSelected = this.costCenterData?.dinas;
            this.getRKAP();
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
  onChangePembatasanAnggaran(val: string): void {
    this.percentageNumber = parseInt(val);
    if (val === '') {
      this.percentageNumber = 100;
      this.isDisabledSimulate = true;
    } else {
      this.isDisabledSimulate = false;
    }
    if (this.percentageNumber > 100) {
      this.percentageNumber = 100;
    }
    if (this.percentageNumber < 0) {
      this.percentageNumber = 0;
    }
  }
  onSimulate(): void {
    this.getRKAP();
  }
  toString(value: number): string {
    return value.toString();
  }
  currencyFormat(val: number): string {
    let USDollar = new Intl.NumberFormat('en-US');
    return USDollar.format(val);
  }
}
