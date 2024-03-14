import { Component, OnInit } from '@angular/core';
import { format } from 'date-fns';
import { EMPTY, Subject, catchError, takeUntil, tap } from 'rxjs';
import { LocalServiceConst } from 'src/app/constanta/local-service-constanta';
import { UserDataDTO } from 'src/app/dto/user-data-dto';
import { ApprovalType, selectType } from 'src/app/lib/types';
import { CostCenterService } from 'src/app/services/opex/cost-center/cost-center.service';
import { LocalStorageService } from 'src/app/services/opex/local-storage/local-storage.service';
import { ApprovalService } from 'src/app/services/opex/need-approval/approval.service';
import { GetAllUsersService } from 'src/app/services/opex/user/get-all-users.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-need-approval',
  templateUrl: './need-approval.component.html',
  styleUrls: ['./need-approval.component.css'],
})
export class NeedApprovalComponent implements OnInit {
  isFilterActive: boolean = true;
  header: string[] = [
    'No.',
    'TA Reff',
    'No. of Request',
    'Type of Letter',
    'Entry Date',
    'Amount Submission',
    'Status',
    'Status To',
    'Department To',
  ];
  dataDinas: selectType[] = [];
  userInfo: UserDataDTO = <UserDataDTO>{};
  page: number = 1;
  perPage: number = 10;
  taReff: string = '';
  requestNumber: string = '';
  status: string = '';
  statusTo: string = '';
  isTAB: boolean = false;
  isTAP: boolean = false;
  isTXC: boolean = false;
  typeOfLetter: string = '';
  dinas: string = '';
  entryDate: string = '';
  entryDateTo: string = '';
  data!: ApprovalType[];
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
  statusType: string[] = ['OPEN', 'PROGRESS', 'CLOSED', 'REVISE', 'REJECT'];
  activeId: string = 'not-active';
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
    }
  }
  constructor(
    private users: GetAllUsersService,
    private approval: ApprovalService,
    private readonly localStorageService: LocalStorageService,
    private costCenter: CostCenterService
  ) {}
  private readonly _onDestroy$: Subject<void> = new Subject<void>();
  ngOnInit(): void {
    this.getUserInfo().then(() => {
      this.checkTXC();
      this.checkTAP();
      this.checkTAB();
      this.getApproval();
      console.log(this.isTAB);
      console.log(this.isTXC);
      console.log(this.userInfo.personalUnit);
      console.log(this.userInfo.personalJob);
    });
    this.getDinas();
  }

  getApproval() {
    this.approval
      .getAllApproval(
        this.userInfo?.personalNumber,
        this.page,
        this.isTAB ? '&isTAB=true' : '&isTAB=false',
        this.isTXC ? '&isTXC-3=true' : '&isTXC-3=false',
        this.isTAP ? '&isTAP=true' : '&isTAP=false',

        `${this.taReff != '' ? '&taReff=' + this.taReff : ''}`,
        `${
          this.requestNumber != '' ? '&requestNumber=' + this.requestNumber : ''
        }`,
        `${this.dinas != '' ? '&dinas=' + this.dinas : ''}`,
        `${
          this.typeOfLetter != '' ? '&typeOfLetter=' + this.typeOfLetter : ''
        }`,
        `${this.entryDate != '' ? '&entryDate=' + this.entryDate : ''}`,
        `${this.entryDateTo != '' ? '&entryDateTo=' + this.entryDateTo : ''}`,
        `${this.status != '' ? '&status=' + this.status : ''}`,
        `${this.statusTo != '' ? '&statusTo=' + this.statusTo : ''}`
      )
      .pipe(
        catchError((err) => {
          console.error('Error occurred:', err);
          return EMPTY;
        }),
        tap((result: any) => {
          if (result && result.data) {
            // Ensure result.data is a single array of glAccountType objects
            const allData = result.data.flatMap((item: ApprovalType) => item);
            const meta = result.meta;
            this.meta = meta;
            this.data = allData;
          }
        }),
        takeUntil(this._onDestroy$)
      )
      .subscribe();
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

            this.dataDinas = this.refactorDinas(result.data);
          }
        }),
        takeUntil(this._onDestroy$)
      )
      .subscribe();
  }
  refactorDinas(data: string[]): selectType[] {
    return data.map((item) => {
      return {
        id: item,
        value: item,
      };
    });
  }
  onPageChange(page: number) {
    this.page = page;
    // this.createArray(this.meta.last_page, this.page, 3);
    this.getApproval();
  }
  resetFilter(): void {
    this.taReff = '';
    this.requestNumber = '';
    this.status = '';
    this.typeOfLetter = '';
    this.dinas = '';
    this.page = 1;
    this.entryDate = '';
    this.entryDateTo = '';

    this.getApproval();
  }
  onTaReff(val: any) {
    this.taReff = val.id;
    this.page = 1;
    this.getApproval();
  }
  onChangeType(val: any) {
    this.typeOfLetter = val.id;
    this.page = 1;
    this.getApproval();
  }
  onChangeDinas(val: any) {
    this.dinas = val.id;
    this.page = 1;
    this.getApproval();
  }
  onChangeStatus(val: any) {
    this.status = val.id;
    this.page = 1;
    this.getApproval();
  }
  onChangeTypeOfLetter(val: any) {
    this.typeOfLetter = val.id;
    this.page = 1;
    this.getApproval();
  }
  onChangeStatusTo(val: any) {
    this.statusTo = val.id;
    this.page = 1;
    this.getApproval();
  }
  onChangeTAReff(val: string) {
    this.page = 1;
    this.taReff = val;
    this.getApproval();
  }
  onChangeRequestNumber(val: string) {
    this.page = 1;
    this.requestNumber = val;
    this.getApproval();
  }
  onChangeEntryDate(val: string): void {
    this.entryDate = val;
    this.page = 1;
    this.getApproval();
  }
  onChangeEntryDateTo(val: string): void {
    this.entryDateTo = val;
    this.page = 1;
    this.getApproval();
  }
  formatDate(val: Date): string {
    return format(new Date(val), 'dd MMM yyyy');
  }

  checkTAB() {
    if (
      this.userInfo.personalUnit === 'TAB' &&
      this.userInfo.personalJob === 'PROFESSIONAL'
    ) {
      this.isTAB = true;
    } else {
      this.isTAB = false;
    }
  }
  checkTAP() {
    if (
      this.userInfo.personalUnit === 'TAP' &&
      this.userInfo.personalJob === 'PROFESSIONAL'
    ) {
      this.isTAP = true;
    } else {
      this.isTAP = false;
    }
  }
  checkTXC() {
    if (
      this.userInfo.personalUnit === 'TXC-3' &&
      this.userInfo.personalJob === 'PROFESSIONAL'
    ) {
      this.isTXC = true;
    } else {
      this.isTXC = false;
    }
  }
}
