import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { format } from 'date-fns';
import { EMPTY, Subject, catchError, of, takeUntil, tap } from 'rxjs';

import Swal from 'sweetalert2';
import {
  CostCenterType,
  CreateRequestRealizationType,
  RealizationItemsType,
  documentCategoryType,
  glAccountType,
  newRequestUploadType,
  selectType,
} from 'src/app/lib/types';
import { CostCenterService } from 'src/app/services/opex/cost-center/cost-center.service';
import { NewRequestService } from 'src/app/services/opex/dashboard/new-request.service';
import { DocumentCategoryService } from 'src/app/services/opex/document-category/document-category.service';
import { KursUsdService } from 'src/app/services/opex/master-data/kurs-usd.service';
import { GetAllUsersService } from 'src/app/services/opex/user/get-all-users.service';
import { LocalStorageService } from 'src/app/services/opex/local-storage/local-storage.service';
import { LocalServiceConst } from 'src/app/constanta/local-service-constanta';
import { UserDataDTO } from 'src/app/dto/user-data-dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-request',
  templateUrl: './new-request.component.html',
  styleUrls: ['./new-request.component.css'],
})
export class NewRequestComponent implements OnInit {
  userData: selectType[] = [];

  requestBody: newRequestUploadType[] = [];
  userInfo: UserDataDTO = <UserDataDTO>{};
  files: File[] = [];
  docCategories: string[] = [];
  docNames: string[] = [];
  createRequest: CreateRequestRealizationType = <
    CreateRequestRealizationType
  >{};
  currentDate: string = format(new Date(), 'dd MMM yyyy');
  idResponsibleNumber: string = '';
  idTypeSubmission: string = '';
  titleRequest: string = '';
  noteRequest: string = '';
  console = console;
  isGroupSelected: boolean = false;
  itemsForm!: FormGroup;
  isDisplay: boolean = true;
  isDisabledSubmit: boolean = false;
  isDisabledSave: boolean = false;
  currentKurs!: number;

  selectGroupData: selectType[] = [];
  selectGroupDetailData: selectType[] = [];

  available: number = 0; //usd
  dataGL!: glAccountType[];

  costCenterData: CostCenterType | null = <CostCenterType>{};
  newRequestData: newRequestUploadType = <newRequestUploadType>{};
  selectDocumentCategoryData: selectType[] = [];
  idDocCategory!: string;
  modalDocumentType!: string;
  docName: string = '';
  fileSize: string = ''; // Initialize with the actual file size
  uploadedFile: File | null = null;
  isUploadSuccess: boolean = false;
  isUploadError: boolean = false;
  uploadError: string = '';
  specificUser: any;
  personalUnit!: string;
  selectedGroupData: any[] = [];
  objectRole: any;
  userRole: string = '';
  constructor(
    private costCenter: CostCenterService,
    private users: GetAllUsersService,
    private fb: FormBuilder,
    private newRequest: NewRequestService,
    private kurs: KursUsdService,
    private docCategory: DocumentCategoryService,
    private router: Router,
    private readonly localStorageService: LocalStorageService
  ) {}
  private readonly _onDestroy$: Subject<void> = new Subject<void>();
  ngOnInit() {
    // this.getSpecificUser(582127);
    this.objectRole = this.localStorageService.getData(LocalServiceConst.ROLE);
    this.userRole = this.objectRole._result;
    this.getCurrentKurs();
    this.fetchGlAccount();
    this.getUserInfo();
    this.fetchDocumentCategory();
    this.itemsForm = this.fb.group({
      items: new FormArray([this.createItem]),
    });
  }
  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }
  generateDinas(dinas: string): void {
    this.personalUnit = dinas.slice(0, 2);
    this.getCostCenter(this.personalUnit);
    this.users.getAllUsers(this.personalUnit).subscribe((response: any) => {
      this.refactorUser(response.body?.data);
    });
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
          }
        }),
        takeUntil(this._onDestroy$)
      )
      .subscribe();
  }
  getValueTypeSubmission(val: any): void {
    this.idTypeSubmission = val.id;
  }

  refactorUser(data: any): selectType[] {
    data.forEach((element: any) => {
      this.userData.push({
        id: element.personalNumber,
        value: element.personalName,
      });
    });
    return this.userData;
  }

  getValue(val: any): void {
    this.idResponsibleNumber = val.id;
  }

  addItems(): void {
    const currentGl =
      this.getItems.controls[this.getItems.controls.length - 1].get(
        'GLNumberControl'
      )?.value;
    if (currentGl != '') {
      this.selectedGroupData.push(currentGl);
      this.selectGroupData = this.selectGroupData.filter((item) => {
        return !this.selectedGroupData.includes(item.id);
      });
      (this.itemsForm.get('items') as FormArray).push(this.createItem);
    }
  }

  removeItem(index: number): void {
    const itemsArray = this.itemsForm.get('items') as FormArray;
    if (itemsArray.length > 1) {
      itemsArray.removeAt(index);
    }
    const currentGl = this.selectedGroupData[index];
    this.selectedGroupData.splice(index, 1);
    const currentData = this.dataGL.filter((item) => {
      return item.glAccount == currentGl;
    });
    this.selectGroupData.push({
      id: currentData[0].glAccount,
      value: currentData[0].description as string,
    });
  }

  showDeleteButton(index: number): boolean {
    return index > 0;
  }

  get formControllers() {
    return this.itemsForm.controls;
  }
  get getItems() {
    return this.formControllers['items'] as FormArray;
  }
  get createItem(): FormGroup {
    return this.fb.group({
      GLNumberControl: new FormControl<string>(''),
      idGlAccount: new FormControl<string>(''),
      groupControl: new FormControl<string>(''),
      groupDetailControl: new FormControl<string>(''),
      availableControl: new FormControl<number>(this.available),
      amountSubmissionControl: new FormControl<string>(''),
      periodStartControl: new FormControl<string>(
        new Date().toISOString().substr(0, 10)
      ),
      periodFinishControl: new FormControl<string>(
        new Date().toISOString().substr(0, 10)
      ),
      descriptionControl: new FormControl<string>(''),
      remarkControl: new FormControl<string>(''),
    });
  }

  getValueGLDetailItem(val: any, index: number): void {
    let temp = this.dataGL.filter((item) => item.glAccount == val.id);
    this.newRequest
      .getAvailable(temp[0].idGlAccount, this.costCenterData?.idCostCenter)
      .pipe(
        catchError((err) => {
          console.error('Error occurred', err);
          return EMPTY;
        }),
        tap((result: { data: any }) => {
          if (result && result.data) {
            this.console.log(result.data.available);
            this.getItems.controls[index]
              .get('idGlAccount')
              ?.setValue(temp[0].idGlAccount);
            this.getItems.controls[index]
              .get('GLNumberControl')
              ?.setValue(temp[0].glAccount);
            this.getItems.controls[index]
              .get('availableControl')
              ?.setValue(result.data.available);
          }
        }),
        takeUntil(this._onDestroy$)
      )
      .subscribe();
  }
  getValueGLItem(val: any, index: number): void {
    this.isGroupSelected = true;
    this.newRequest
      .getAllGroupGL(val.value)
      .pipe(
        catchError((err) => {
          console.error('Error occurred', err);
          return EMPTY;
        }),
        tap((result: { data: any }) => {
          if (result && result.data) {
            // Ensure result.data is a single array of glAccountType objects
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
  getCurrentKurs() {
    return this.kurs
      .getLastKurs()
      .pipe(
        catchError((err) => {
          console.error('Error occurred', err);
          return EMPTY;
        }),
        tap((result: { data: any }) => {
          if (result && result.data) {
            // Ensure result.data is a single array of glAccountType objects
            this.currentKurs = result.data.value;
          }
        }),
        takeUntil(this._onDestroy$)
      )
      .subscribe();
  }
  fetchGlAccount(): void {
    this.newRequest
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

  refactorItemsData(data: any): RealizationItemsType[] {
    const items: RealizationItemsType[] = [];
    data.forEach((element: any) => {
      items.push({
        amountSubmission: element.amountSubmissionControl,
        periodStart: new Date(
          element.periodStartControl
        ).toISOString() as unknown as Date,
        periodFinish: new Date(
          element.periodFinishControl
        ).toISOString() as unknown as Date,
        descPby: element.descriptionControl,
        remarkPby: element.remarkControl,
        glAccountId: element.idGlAccount,
      });
    });
    return items;
  }

  save(): void {
    if (
      this.idResponsibleNumber === '' ||
      this.idTypeSubmission === '' ||
      this.titleRequest === '' ||
      this.noteRequest === '' ||
      this.files.length === 0 ||
      this.docCategories.length === 0 ||
      this.docNames.length === 0
    ) {
      Swal.fire('', 'Please fill all the fields', 'error');
      return;
    }
    this.isDisabledSave = true;
    this.isDisabledSubmit = true;
    this.createRequest.type = this.idTypeSubmission;
    this.createRequest.responsibleNopeg = this
      .idResponsibleNumber as unknown as number;
    this.createRequest.personalNumber = this.userInfo.personalNumber;
    this.createRequest.costCenterId = this.costCenterData!
      .idCostCenter as number;
    this.createRequest.createdBy = this.userInfo.personalNumber;
    this.createRequest.realizationItems = this.refactorItemsData(
      this.itemsForm.value.items
    );
    this.createRequest.titleRequest = this.titleRequest;
    this.createRequest.noteRequest = this.noteRequest;
    this.createRequest.uploadfile = this.files;
    this.createRequest.docCategoryId = this.docCategories;
    this.createRequest.docName = this.docNames;
    const formdata = this.convertToFormData(this.createRequest);

    this.newRequest
      .postSaveCreateRequestRealization(formdata)
      .pipe(
        catchError((error: any) => {
          this.console.error('There was an error!', error);

          return of();
        })
      )
      .subscribe(
        (data: any) => {
          Swal.fire('', 'Create Request Realization Success', 'success');
          this.resetAll();
        },
        (error: any) => {
          this.console.error('Error', error);
        }
      );
  }
  submit(): void {
    if (
      this.idResponsibleNumber === '' ||
      this.idTypeSubmission === '' ||
      this.titleRequest === '' ||
      this.noteRequest === '' ||
      this.files.length === 0 ||
      this.docCategories.length === 0 ||
      this.docNames.length === 0
    ) {
      Swal.fire('', 'Please fill all the fields', 'error');
      return;
    }
    this.isDisabledSubmit = true;
    this.isDisabledSave = true;

    this.createRequest.type = this.idTypeSubmission;
    this.createRequest.responsibleNopeg = this
      .idResponsibleNumber as unknown as number;
    this.createRequest.personalNumber = this.userInfo.personalNumber;
    this.createRequest.costCenterId = this.costCenterData!
      .idCostCenter as number;
    this.createRequest.createdBy = this.userInfo.personalNumber;
    this.createRequest.realizationItems = this.refactorItemsData(
      this.itemsForm.value.items
    );
    this.createRequest.titleRequest = this.titleRequest;
    this.createRequest.noteRequest = this.noteRequest;
    this.createRequest.uploadfile = this.files;
    this.createRequest.docCategoryId = this.docCategories;
    this.createRequest.docName = this.docNames;
    const formdata = this.convertToFormData(this.createRequest);
    formdata.forEach((value, key) => {
      console.log(key + ' ' + value);
    });
    this.newRequest
      .postSubmitCreateRequestRealization(formdata)
      .pipe(
        catchError((error: any) => {
          this.console.error('There was an error!', error);
          Swal.fire('', error, 'error');
          this.isDisabledSubmit = false;
          this.isDisabledSave = false;
          return of();
        })
      )
      .subscribe(
        (data: any) => {
          this.router.navigate(['/dashboard']);
          this.resetAll();
        },
        (error: any) => {
          this.console.error('Error', error);
        }
      );
  }
  convertToFormData(data: any): FormData {
    const formData = new FormData();
    formData.append('type', data.type);
    formData.append('responsibleNopeg', data.responsibleNopeg);
    formData.append('titleRequest', data.titleRequest);
    formData.append('noteRequest', data.noteRequest);
    formData.append('personalNumber', data.personalNumber);
    formData.append('costCenterId', data.costCenterId);
    formData.append('createdBy', data.createdBy);
    data.docCategoryId.forEach((element: any, index: number) => {
      formData.append(`docCategoryId[${index}]`, element);
    });
    data.docName.forEach((element: any, index: number) => {
      formData.append(`docName[${index}]`, element);
    });
    data.uploadfile.forEach((element: any, index: number) => {
      formData.append(`uploadfile[${index}]`, element);
    });
    data.realizationItems.forEach((element: any, index: number) => {
      formData.append(
        `realizationItems[${index}][amountSubmission]`,
        element.amountSubmission
      );
      formData.append(
        `realizationItems[${index}][periodStart]`,
        element.periodStart
      );
      formData.append(
        `realizationItems[${index}][periodFinish]`,
        element.periodFinish
      );
      formData.append(`realizationItems[${index}][descPby]`, element.descPby);
      formData.append(
        `realizationItems[${index}][remarkPby]`,
        element.remarkPby
      );
      formData.append(
        `realizationItems[${index}][glAccountId]`,
        element.glAccountId
      );
    });

    // formData.append('uploadfile', data.uploadfile);
    // formData.append('docCategoryId', data.docCategoryId);
    // formData.append('docName', data.docName);
    return formData;
  }
  fetchDocumentCategory(): void {
    this.docCategory
      .getAllGroup()
      .pipe(
        catchError((err) => {
          console.error('Error occurred:', err);
          return EMPTY;
        }),
        tap((result) => {
          if (result && result.data) {
            const allData = result.data.flatMap((item) => item);
            this.refactorSelectDocumentCategoryData(allData);
          }
        }),
        takeUntil(this._onDestroy$)
      )
      .subscribe();
  }
  refactorSelectDocumentCategoryData(data: documentCategoryType[]): void {
    data.forEach((element: documentCategoryType) => {
      this.selectDocumentCategoryData.push({
        id: element.idDocCategory,
        value: element.docCategory,
      });
    });
  }
  uploadToTable() {
    if (this.uploadedFile) {
      const bytes = this.uploadedFile.size;
      const maxSize = 1048576; // 1 MB limit
      if (bytes > maxSize) {
      } else {
        if (this.idDocCategory === '' || this.docName === '') {
          this.isUploadError = true;
          this.isUploadSuccess = false;
          this.uploadError = 'Please fill all the fields';

          return;
        }
        this.selectDocumentCategoryData.filter((item) => {
          if (item.id === this.idDocCategory) {
            this.modalDocumentType = item.value;
          }
        });
        this.newRequestData.documentName = this.docName;
        this.newRequestData.documentType = this.modalDocumentType;
        this.newRequestData.file = this.uploadedFile;
        this.newRequestData.size = this.fileSize;
        this.files.push(this.uploadedFile);
        this.docNames.push(this.docName);
        this.docCategories.push(this.idDocCategory);
        this.requestBody.push(this.newRequestData);

        this.clearUp();
      }
    } else {
      this.isUploadError = true;
      this.isUploadSuccess = false;
      this.uploadError = 'Please fill all the fields';
    }
  }
  clearUp(): void {
    this.isUploadSuccess = false;
    this.isUploadError = false;
    this.newRequestData = <newRequestUploadType>{};
    this.idDocCategory = '';
    this.modalDocumentType = '';
    this.docName = '';
    this.uploadedFile = null;
    this.fileSize = '';
  }
  resetAll(): void {
    this.isUploadSuccess = false;
    this.isUploadError = false;
    this.newRequestData = <newRequestUploadType>{};
    this.itemsForm = this.fb.group({
      items: new FormArray([this.createItem]),
    });
    this.idDocCategory = '';
    this.titleRequest = '';
    this.noteRequest = '';
    this.idResponsibleNumber = '';
    this.modalDocumentType = '';
    this.docName = '';
    this.uploadedFile = null;
    this.fileSize = '';
    this.files = [];
    this.docNames = [];
    this.docCategories = [];
    this.requestBody = [];
    this.isDisabledSave = false;
    this.isDisabledSubmit = false;
    this.clearUp();
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
  generateSize(bytes: number): string {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
  }

  getValueDocType(val: any): void {
    this.idDocCategory = val.id;
  }
  getValueDocName(val: string): void {
    this.docName = val;
  }
  getTitleRequest(val: string): void {
    this.titleRequest = val;
  }
  getNoteRequest(val: string): void {
    this.noteRequest = val;
  }
}
