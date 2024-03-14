import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { EMPTY, Subject, catchError, takeUntil, tap } from 'rxjs';
import { LocalServiceConst } from 'src/app/constanta/local-service-constanta';
import {
  RealizationUpdateDto,
  TakeProjectDto,
  UpdateRealizationDto,
} from 'src/app/dto/approve.dto';
import { RealizationDTO } from 'src/app/dto/request-verification.dto';
import { UserDataDTO } from 'src/app/dto/user-data-dto';
import { LocalStorageService } from 'src/app/services/opex/local-storage/local-storage.service';
import { ApprovalService } from 'src/app/services/opex/need-approval/approval.service';
import { RequestVerificationService } from 'src/app/services/opex/need-approval/request-verification.service';
import { GetAllUsersService } from 'src/app/services/opex/user/get-all-users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-request-verification',
  templateUrl: './request-verification.component.html',
  styleUrls: ['./request-verification.component.css'],
})
export class RequestVerificationComponent implements OnInit {
  @Input() data!: RealizationDTO;
  localStorageService: any;
  idApproval!: number | null | string;
  userInfo: any;
  userData: any;
  isTAB: boolean = false;
  isTXC: boolean = false;
  isTAP: boolean = false;
  isVP: boolean = false;
  objectRole: any;
  userRole: string = '';
  dataResponsibleNoPeg: UserDataDTO = {
    personalName: '',
    personalNumber: '',
    personalTitle: '',
    personalImage: '',
    personalUnit: '',
    personalBirthPlace: '',
    personalBirthDate: new Date(),
    personalGrade: '',
    personalJob: '',
    personalEmail: '',
  };
  dataPersonalNumberTo: UserDataDTO = {
    personalName: '',
    personalNumber: '',
    personalTitle: '',
    personalImage: '',
    personalUnit: '',
    personalBirthPlace: '',
    personalBirthDate: new Date(),
    personalGrade: '',
    personalJob: '',
    personalEmail: '',
  };
  constructor(
    private approval: ApprovalService,
    private users: GetAllUsersService
  ) {
    this.localStorageService = new LocalStorageService();
  }
  private readonly _onDestroy$: Subject<void> = new Subject<void>();
  ngOnInit(): void {
    this.objectRole = this.localStorageService.getData(LocalServiceConst.ROLE);
    this.userRole = this.objectRole._result;

    this.userInfo = JSON.parse(
      this.localStorageService.getData(LocalServiceConst.USER_INFO)
    );
    this.userData = JSON.parse(
      this.localStorageService.getData(LocalServiceConst.USER_INFO)
    );
    if (this.data) {
      this.idApproval = this.data.idRealization;
    }

    if (this.data.responsibleNopeg != null) {
      this.getResponsibleNoPegDetail(this.data.responsibleNopeg);
    }
    if (this.data.personalNumberTo != null) {
      this.getPersonalNumberToDetail(this.data.personalNumberTo);
    }
    this.checkVP();
    this.checkTAB();
    this.checkTXC();
  }
  formatDate(val: Date): string {
    return format(new Date(val), 'dd MMM yyyy');
  }
  getResponsibleNoPegDetail(noPeg: string): void {
    this.users
      .getDetailUsers(noPeg)
      .pipe(
        catchError((err) => {
          console.error('Error occurred:', err);
          return EMPTY;
        }),
        tap((res) => {
          this.dataResponsibleNoPeg = res.body;
        }),
        takeUntil(this._onDestroy$)
      )
      .subscribe();
  }
  getPersonalNumberToDetail(noPeg: string): void {
    this.users
      .getDetailUsers(noPeg)
      .pipe(
        catchError((err) => {
          console.error('Error occurred:', err);
          return EMPTY;
        }),
        tap((res) => {
          this.dataPersonalNumberTo = res.body;
        }),
        takeUntil(this._onDestroy$)
      )
      .subscribe();
  }
  updateDataStatusId() {
    console.log(this.userData);
    const object: RealizationUpdateDto = {
      idRealization: this.idApproval,
      updateRealizationDto: {
        status: this.data.statusId >= 4 ? 'PROGRESS' : 'OPEN',
        statusId: this.data.statusId + 1,
        statusToId: this.data.statusToId + 1,
        updatedBy: this.userData.personalNumber,
      },
      approvalDto: {
        name: this.userData.personalName,
        jabatan: this.userData.personalJob,
        unit: this.userData.personalUnit,
        remark: null,
      },
    };
    console.log(object);
    this.approval
      .updateStatus(object)
      .pipe(
        catchError((err) => {
          console.error('Error occurred:', err);
          Swal.fire({
            title: 'Alert!',
            html: 'failed to upload data',
            icon: 'error',
            confirmButtonColor: '#276BC5',
          });
          return EMPTY;
        }),
        tap(() => {
          Swal.fire({
            title: 'Alert!',
            html: 'Success',
            icon: 'success',
            confirmButtonColor: '#276BC5',
          }).then(() => window.location.reload());
        }),
        takeUntil(this._onDestroy$)
      )
      .subscribe();
  }
  rejectDataStatusId() {
    this.userInfo = this.localStorageService.getData(
      LocalServiceConst.USER_INFO
    );

    console.log(this.userData);
    const object: RealizationUpdateDto = {
      idRealization: this.idApproval,
      updateRealizationDto: {
        status: (this.data.status = 'REJECT'),
        statusId: this.data.statusId + 1,
        statusToId: null,
        updatedBy: this.userData.personalNumber,
      },
      approvalDto: {
        name: this.userData.personalName,
        jabatan: this.userData.personalJob,
        unit: this.userData.personalUnit,
        remark: null,
      },
    };
    console.log(object);
    this.approval
      .updateStatus(object)
      .pipe(
        catchError((err) => {
          console.error('Error occurred:', err);
          Swal.fire({
            title: 'Alert!',
            html: 'failed to reject data',
            icon: 'error',
            confirmButtonColor: '#276BC5',
          });
          return EMPTY;
        }),
        tap(() => {
          Swal.fire({
            title: 'Alert!',
            html: 'Success',
            icon: 'success',
            confirmButtonColor: '#276BC5',
          }).then(() => window.location.reload());
        }),
        takeUntil(this._onDestroy$)
      )
      .subscribe();
  }
  takeProjectData() {
    this.checkVP();
    this.checkTAB();
    this.checkTXC();

    const object: TakeProjectDto = {
      status: 'PROGRESS',
      personalNumberTo: this.userData.personalNumber,
      updatedBy: this.userData.personalNumber,
    };
    console.log(object);
    this.approval
      .takeProject(
        object,
        this.data.idRealization,
        this.isTAB ? '?isTAB=true' : '?isTAB=false',
        this.isTXC ? '&isTXC-3=true' : '&isTXC-3=false',
        this.isTAP ? '&isTAP=true' : '&isTAP=false'
      )
      .pipe(
        catchError((err) => {
          console.error('Error occurred:', err);
          Swal.fire({
            title: 'Alert!',
            html: 'failed to take project',
            icon: 'error',
            confirmButtonColor: '#276BC5',
          });
          return EMPTY;
        }),
        tap(() => {
          Swal.fire({
            title: 'Alert!',
            html: 'Success',
            icon: 'success',
            confirmButtonColor: '#276BC5',
          }).then(() => window.location.reload());
        }),
        takeUntil(this._onDestroy$)
      )
      .subscribe();
  }
  untakeProjectData() {
    const object: TakeProjectDto = {
      status: 'OPEN',
      personalNumberTo: null,
      updatedBy: this.userData.personalNumber,
    };
    console.log(object);
    this.approval
      .takeProject(
        object,
        this.data.idRealization,
        this.isTAB ? '?isTAB=true' : '?isTAB=false',
        this.isTXC ? '&isTXC-3=true' : '&isTXC-3=false',
        this.isTAP ? '&isTAP=true' : '&isTAP=false'
      )
      .pipe(
        catchError((err) => {
          console.error('Error occurred:', err);
          Swal.fire({
            title: 'Alert!',
            html: 'failed to take project',
            icon: 'error',
            confirmButtonColor: '#276BC5',
          });
          return EMPTY;
        }),
        tap(() => {
          Swal.fire({
            title: 'Alert!',
            html: 'Success',
            icon: 'success',
            confirmButtonColor: '#276BC5',
          }).then(() => window.location.reload());
        }),
        takeUntil(this._onDestroy$)
      )
      .subscribe();
  }
  checkVP() {
    if (this.userData.personalJob === 'VICE PRESIDENT') {
      this.isVP = true;
    } else {
      this.isVP = false;
    }
  }
  checkTAB() {
    if (
      this.userData.personalUnit === 'TAB' &&
      this.userData.personalJob === 'PROFESSIONAL'
    ) {
      this.isTAB = true;
    } else {
      this.isTAB = false;
    }
  }
  checkTXC() {
    if (
      this.userData.personalUnit === 'TXC-3' &&
      this.userData.personalJob === 'PROFESSIONAL'
    ) {
      this.isTXC = true;
    } else {
      this.isTXC = false;
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
}
