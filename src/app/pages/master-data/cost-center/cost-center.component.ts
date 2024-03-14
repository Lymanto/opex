import { Component, OnInit } from '@angular/core';
import { format } from 'date-fns';
import { Modal } from 'flowbite';
import { EMPTY, Subject, catchError, of, takeUntil, tap } from 'rxjs';
import { UserDataDTO } from 'src/app/dto/user-data-dto';
import { Flowbite } from 'src/app/lib/flowbite';
import { CostCenterType, kursType, selectType } from 'src/app/lib/types';
import { CostCenterService } from 'src/app/services/opex/cost-center/cost-center.service';
import { LocalStorageService } from 'src/app/services/opex/local-storage/local-storage.service';
import { KursUsdService } from 'src/app/services/opex/master-data/kurs-usd.service';
import { LocalServiceConst } from 'src/app/constanta/local-service-constanta';
import Swal from 'sweetalert2';
import { GetAllUsersService } from 'src/app/services/opex/user/get-all-users.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-cost-center',
  templateUrl: './cost-center.component.html',
  styleUrls: ['./cost-center.component.css'],
})
export class CostCenterComponent {
  yearsSelected!: number;
  inputValue!: number;
  tableData: CostCenterType[] = [];
  currentYear: string = format(new Date(), 'yyyy');
  console = console;
  errorMessage: any;
  selectedCostCenter!: any;
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
    private costCenter: CostCenterService,
    private kurs: KursUsdService,
    private fb: FormBuilder,
    private users: GetAllUsersService,
    private readonly localStorageService: LocalStorageService
  ) {}
  getCostCenter(): void {
    this.costCenter
      .getAllCostCenterPagination(this.page.toString())
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
  costCenterAddPost(createdBy: string): void {
    const data: CostCenterType = {
      costCenter: this.itemsForm.get('costCenterField')?.value as string,
      description: this.itemsForm.get('descriptionField')?.value as string,
      bidang: this.itemsForm.get('bidangField')?.value as string,
      dinas: this.itemsForm.get('dinasField')?.value as string,
      directorat: this.itemsForm.get('directoratField')?.value as string,
      groupDinas: this.itemsForm.get('groupDinasField')?.value as string,
      profitCenter: this.itemsForm.get('profitCenterField')?.value as string,
      active: this.itemsForm.get('activeField')?.value as boolean,
      createdBy: createdBy,
    };
    this.costCenter
      .postCostCenter(data)
      .pipe(
        catchError((error: any) => {
          this.errorMessage = error.message;
          this.console.error('There was an error!', error);

          Swal.fire('', error.error.message, 'error');
          return of();
        }),
        tap(
          (data: any) => {
            this.getCostCenter();
            Swal.fire('', 'Add new cost center success', 'success');
          },
          (error: any) => {
            this.console.error('Error', error);
          }
        )
      )
      .subscribe();
  }
  costCenterEditPut(createdBy: string): void {
    const data: CostCenterType = {
      costCenter: this.itemsForm.get('costCenterField')?.value as string,
      description: this.itemsForm.get('descriptionField')?.value as string,
      bidang: this.itemsForm.get('bidangField')?.value as string,
      dinas: this.itemsForm.get('dinasField')?.value as string,
      directorat: this.itemsForm.get('directoratField')?.value as string,
      groupDinas: this.itemsForm.get('groupDinasField')?.value as string,
      profitCenter: this.itemsForm.get('profitCenterField')?.value as string,
      active: this.itemsForm.get('activeField')?.value as boolean,
      updatedBy: createdBy,
    };
    this.costCenter
      .putCostCenter(data, this.selectedCostCenter.idCostCenter)
      .pipe(
        catchError((error: any) => {
          this.errorMessage = error.message;
          this.console.error('There was an error!', error);

          Swal.fire('', error.error.message, 'error');
          return of();
        }),
        tap(
          (data: any) => {
            this.getCostCenter();
            const elKurs: HTMLElement = document.querySelector(
              '#costCenterEdit'
            ) as HTMLElement;
            const modal = new Modal(elKurs);
            modal.hide();
            document.querySelector('body > div[modal-backdrop]')?.remove();
            this.selectedCostCenter = {};
            Swal.fire('', 'Update Success', 'success');
          },
          (error: any) => {
            this.console.error('Error', error);
          }
        )
      )
      .subscribe();
  }

  costCenterEditOpen(item: CostCenterType) {
    const elKurs: HTMLElement = document.querySelector(
      '#costCenterEdit'
    ) as HTMLElement;
    const modal = new Modal(elKurs);
    this.itemsForm.patchValue({
      costCenterField: item.costCenter,
      descriptionField: item.description,
      bidangField: item.bidang,
      dinasField: item.dinas,
      directoratField: item.directorat,
      groupDinasField: item.groupDinas,
      profitCenterField: item.profitCenter,
      activeField: item.active,
    });
    this.selectedCostCenter = item;
    modal.show();
  }
  costCenterEditClose() {
    const elKurs: HTMLElement = document.querySelector(
      '#costCenterEdit'
    ) as HTMLElement;
    const modal = new Modal(elKurs);
    modal.hide();
    document.querySelector('body > div[modal-backdrop]')?.remove();
    this.selectedCostCenter = {};
  }
  onPageChange(page: number) {
    this.page = page;
    this.getCostCenter();
  }
  ngOnInit() {
    this.generateYears();
    this.getCostCenter();
    this.getUserInfo();
    this.itemsForm = this.createItem;
  }
  get createItem(): FormGroup {
    return this.fb.group({
      costCenterField: new FormControl<string>('', [Validators.required]),
      descriptionField: new FormControl<string>('', [Validators.required]),
      bidangField: new FormControl<string>('', [Validators.required]),
      dinasField: new FormControl<string>('', [Validators.required]),
      directoratField: new FormControl<string>('', [Validators.required]),
      groupDinasField: new FormControl<string>('', [Validators.required]),
      profitCenterField: new FormControl<string>('', [Validators.required]),
      activeField: new FormControl<boolean>(true),
    });
  }
}
