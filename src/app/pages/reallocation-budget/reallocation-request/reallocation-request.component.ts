import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormArray,
  FormControl,
  Validators,
} from '@angular/forms';
import { format } from 'date-fns';
import { EMPTY, Subject, catchError, takeUntil, tap } from 'rxjs';
import { glAccountType, selectType } from 'src/app/lib/types';
import { NewRequestService } from 'src/app/services/opex/dashboard/new-request.service';

@Component({
  selector: 'app-reallocation-request',
  templateUrl: './reallocation-request.component.html',
  styleUrls: ['./reallocation-request.component.css'],
})
export class ReallocationRequestComponent implements OnInit {
  console = console;
  itemsForm!: FormGroup;
  currentDate: string = format(new Date(), 'dd MMM yyyy');
  constructor(private fb: FormBuilder, private service: NewRequestService) {}
  ngOnInit() {
    this.itemsForm = this.fb.group({
      items: new FormArray([this.createItem]),
    });
    // console.log(this.itemsForm);
    this.fetchGlAccount();
  }
  addItems(): void {
    (this.itemsForm.get('items') as FormArray).push(this.createItem);
  }
  get formControllers() {
    return this.itemsForm.controls;
  }
  get getItems() {
    return this.formControllers['items'] as FormArray;
  }
  get createItem(): FormGroup {
    return this.fb.group({
      groupControl: [new FormControl<string>('', Validators.required)],
      groupDetailControl: [new FormControl<string>('', Validators.required)],
      GLDetailControl: [new FormControl<string>('', Validators.required)],
      availableControl: [new FormControl<string>('', Validators.required)],
      amountSubmissionControl: [
        new FormControl<string>('', Validators.required),
      ],
      periodStartControl: [new FormControl<string>('', Validators.required)],
      periodFinishControl: [new FormControl<string>('', Validators.required)],
      descriptionPBControl: [new FormControl<string>('', Validators.required)],
      remarkPBControl: [new FormControl<string>('', Validators.required)],
    });
  }

  NewRequestService: any;
  selectGroupData: selectType[] = [];
  selectGroupDetail: selectType[] = [];

  private readonly _onDestroy$: Subject<void> = new Subject<void>();

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
}
