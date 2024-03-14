import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { format } from 'date-fns';
import { Modal } from 'flowbite';
import { EMPTY, Subject, catchError, of, takeUntil, tap } from 'rxjs';
import { LocalServiceConst } from 'src/app/constanta/local-service-constanta';
import { UserDataDTO } from 'src/app/dto/user-data-dto';
import { glAccountType, selectType } from 'src/app/lib/types';
import { LocalStorageService } from 'src/app/services/opex/local-storage/local-storage.service';
import { GlaccountService } from 'src/app/services/opex/master-data/glaccount.service';
import { GetAllUsersService } from 'src/app/services/opex/user/get-all-users.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-glaccount',
  templateUrl: './glaccount.component.html',
  styleUrls: ['./glaccount.component.css'],
})
export class GLAccountComponent {
  yearsSelected!: number;
  inputValue!: number;
  tableData: glAccountType[] = [];
  currentYear: string = format(new Date(), 'yyyy');
  console = console;
  errorMessage: any;
  selecteGLAccount!: any;
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
  itemsForm!: FormGroup;
  userInfo: UserDataDTO = <UserDataDTO>{};
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
  constructor(
    private glAccount: GlaccountService,
    private fb: FormBuilder,
    private users: GetAllUsersService,
    private readonly localStorageService: LocalStorageService
  ) {}
  getGLAccount(): void {
    this.glAccount
      .getAllGroupGL(this.page.toString())
      .pipe(
        catchError((err) => {
          console.error('Error occurred:', err);
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
  generateYears(): void {
    for (let i = 1; i <= 10; i++) {
      this.yearsData.push({
        id: (parseInt(this.currentYear) - i).toString(),
        value: (parseInt(this.currentYear) - i).toString(),
      });
    }
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
          confirmButtonColor: '#1F569D',
        });
      }
    } else {
      let _userInfo: any = {
        ...this.localStorageService.getData(LocalServiceConst.USER_INFO),
      };
      this.userInfo = JSON.parse(_userInfo?._result);
    }
  }
  getValueSelectBox(val: any): void {
    this.yearsSelected = parseInt(val.id);
  }
  getValueInputText(val: string): void {
    this.inputValue = parseInt(val);
  }
  glAccountAddPost(createdBy: string): void {
    const data: glAccountType = {
      glAccount: this.itemsForm.get('glAccountField')?.value as string,
      groupDetail: this.itemsForm.get('groupDetailField')?.value as string,
      groupGl: this.itemsForm.get('groupGlField')?.value as string,
      sap: this.itemsForm.get('sap')?.value as boolean,
      active: this.itemsForm.get('active')?.value as boolean,
      createdBy: this.userInfo?.personalNumber as string,
    };
    this.glAccount
      .postGLAccount(data)
      .pipe(
        catchError((error: any) => {
          this.errorMessage = error.message;
          this.console.error('There was an error!', error);

          Swal.fire('', error.error.message, 'error');
          return of();
        }),
        tap(
          (data: any) => {
            this.getGLAccount();
            Swal.fire('', 'Add new cost center success', 'success');
          },
          (error: any) => {
            this.console.error('Error', error);
          }
        )
      )
      .subscribe();
  }
  glAccountEditPut(createdBy: string): void {
    const data: glAccountType = {
      glAccount: this.itemsForm.get('glAccountField')?.value as string,
      groupDetail: this.itemsForm.get('groupDetailField')?.value as string,
      groupGl: this.itemsForm.get('groupGlField')?.value as string,
      sap: this.itemsForm.get('sap')?.value as boolean,
      active: this.itemsForm.get('active')?.value as boolean,
      updatedBy: this.userInfo?.personalNumber as string,
    };
    this.glAccount
      .putGLAccount(data, this.selecteGLAccount.idGlAccount)
      .pipe(
        catchError((error: any) => {
          this.errorMessage = error.message;
          this.console.error('There was an error!', error);

          Swal.fire('', error.error.message, 'error');
          return of();
        }),
        tap(
          (data: any) => {
            this.getGLAccount();
            const elKurs: HTMLElement = document.querySelector(
              '#glAccountEdit'
            ) as HTMLElement;
            const modal = new Modal(elKurs);
            modal.hide();
            document.querySelector('body > div[modal-backdrop]')?.remove();
            this.selecteGLAccount = {};
            Swal.fire('', 'Update Success', 'success');
          },
          (error: any) => {
            this.console.error('Error', error);
          }
        )
      )
      .subscribe();
  }

  glAccountEditOpen(item: glAccountType) {
    const elKurs: HTMLElement = document.querySelector(
      '#glAccountEdit'
    ) as HTMLElement;
    const modal = new Modal(elKurs);
    this.itemsForm.patchValue({
      glAccountField: item.glAccount,
      groupDetailField: item.groupDetail,
      groupGlField: item.groupGl,
      sap: item.sap,
      active: item.active,
    });
    this.selecteGLAccount = item;

    modal.show();
  }
  glAccountEditClose() {
    const elKurs: HTMLElement = document.querySelector(
      '#glAccountEdit'
    ) as HTMLElement;
    const modal = new Modal(elKurs);
    modal.hide();
    document.querySelector('body > div[modal-backdrop]')?.remove();
    this.selecteGLAccount = {};
  }
  onPageChange(page: number) {
    this.page = page;
    this.getGLAccount();
  }
  ngOnInit() {
    this.generateYears();
    this.getGLAccount();
    this.getUserInfo();
    this.itemsForm = this.createItem;
  }
  get createItem(): FormGroup {
    return this.fb.group({
      glAccountField: new FormControl<string>('', [Validators.required]),
      groupDetailField: new FormControl<string>('', [Validators.required]),
      groupGlField: new FormControl<string>('', [Validators.required]),
      sap: new FormControl<boolean>(false),
      active: new FormControl<boolean>(true),
    });
  }
}
