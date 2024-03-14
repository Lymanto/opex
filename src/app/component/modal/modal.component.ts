import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { EMPTY, Subject, catchError, takeUntil, tap } from 'rxjs';
import { LocalServiceConst } from 'src/app/constanta/local-service-constanta';
import { RealizationUpdateDto } from 'src/app/dto/approve.dto';
import { RealizationDTO } from 'src/app/dto/request-verification.dto';
import { Flowbite } from 'src/app/lib/flowbite';
import {
  documentCategoryType,
  newRequestUploadType,
  selectType,
} from 'src/app/lib/types';
import { DocumentCategoryService } from 'src/app/services/opex/document-category/document-category.service';
import { LocalStorageService } from 'src/app/services/opex/local-storage/local-storage.service';
import { ApprovalService } from 'src/app/services/opex/need-approval/approval.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
@Flowbite()
export class ModalComponent implements OnInit, OnDestroy {
  @Input() label: string = '';
  @Input() id: string = '';
  @Input() data!: RealizationDTO;
  @Input() isHref: boolean = false;
  @Input() href: string = '';
  @Input() icon: string = '';
  @Input() type: string = '';
  password: string = '940017';
  PasswordFormControl = new FormControl<string>('');
  passwordForm!: FormGroup;
  remarkForm!: FormGroup;
  idApproval!: number | null | string;
  isLoading: boolean = false;
  userInfo: any;
  localStorageService: any;
  yearsSelected!: number;
  console = console;
  currentYear: string = format(new Date(), 'yyyy');
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

  constructor(private approval: ApprovalService, private fb: FormBuilder) {
    this.localStorageService = new LocalStorageService();
  }

  private readonly _onDestroy$: Subject<void> = new Subject<void>();

  ngOnInit() {
    this.generateYears();
    this.createPasswordForm();
    this.createRemarkForm();
    if (this.data) {
      this.idApproval = this.data.idRealization;
    }
  }
  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }
  updateDataStatusId() {
    this.userInfo = this.localStorageService.getData(
      LocalServiceConst.USER_INFO
    );
    const userData = JSON.parse(this.userInfo._result); // buat data menjadi object
    console.log(userData);
    const object: RealizationUpdateDto = {
      idRealization: this.idApproval,
      updateRealizationDto: {
        status: this.data.statusId >= 6 ? 'PROGRESS' : 'OPEN',
        statusId: this.data.statusId + 1,
        statusToId: this.data.statusToId + 1,
        updatedBy: userData.personalNumber,
      },
      approvalDto: {
        name: userData.personalName,
        jabatan: userData.personalJob,
        unit: userData.personalUnit,
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
  approvedUpdate() {
    this.isLoading = true;
    if (this.password === this.passwordForm.value.password) {
      this.updateDataStatusId();
    } else {
      this.isLoading = false;
      Swal.fire({
        title: 'Alert!',
        html: 'wrong password',
        icon: 'error',
        confirmButtonColor: '#276BC5',
      });
    }
  }
  createPasswordForm() {
    this.passwordForm = this.fb.group({
      password: new FormControl<string>(''),
    });
  }
  createRemarkForm() {
    this.remarkForm = this.fb.group({
      remark: new FormControl<string>(''),
    });
  }
  rejectDataStatusId() {
    this.userInfo = this.localStorageService.getData(
      LocalServiceConst.USER_INFO
    );
    const userData = JSON.parse(this.userInfo._result); // buat data menjadi object
    console.log(userData);
    this.console.log(this.data);
    const object: RealizationUpdateDto = {
      idRealization: this.idApproval,
      updateRealizationDto: {
        status: (this.data.status = 'REJECT'),
        statusId: this.data.statusId,
        statusToId: null,
        updatedBy: userData.personalNumber,
      },
      approvalDto: {
        name: userData.personalName,
        jabatan: userData.personalJob,
        unit: userData.personalUnit,
        remark: this.remarkForm.value.remark,
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
}
