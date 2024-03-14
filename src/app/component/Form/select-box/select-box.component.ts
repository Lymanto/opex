import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatAutocompleteTrigger,
  MatAutocomplete,
} from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { selectType } from 'src/app/lib/types';

@Component({
  selector: 'app-select-box',
  templateUrl: './select-box.component.html',
  styleUrls: ['./select-box.component.css'],
  // standalone: true,
  // imports: [
  //   FormsModule,
  //   MatAutocompleteModule,
  //   ReactiveFormsModule,
  //   NgFor,
  //   NgIf,
  //   AsyncPipe,
  // ],
})
export class SelectBoxComponent implements OnInit {
  @Input() label: string = '';
  @Input() id: string = '';
  @Input() data!: any;
  @Input() required: boolean = false;
  @Input() isReadOnly: boolean = false;
  @Input() value: string = '';
  @Output() selectedValue: EventEmitter<string> = new EventEmitter<string>();
  console = console;
  @Input() control = new FormControl();
  filteredDatas: Observable<selectType[]> | undefined;

  ngOnInit() {
    this.control.setValue(this.value);
    this.filteredDatas = this.control.valueChanges.pipe(
      startWith(''),
      map((value: any) => {
        const name = typeof value === 'string' ? value : value?.value;
        return name ? this._filter(name as string) : this.data.slice();
      })
    );
  }

  private _filter(value: string): selectType[] {
    const filterValue = this._normalizeValue(value);
    return this.data.filter((items: any) =>
      this._normalizeValue(items.value).includes(filterValue)
    );
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }
  getValue(val: any): void {
    this.selectedValue.emit(val);
  }
  displayFn(item: any): string {
    return item ? item.value : '';
  }
  resetAutoInput(trigger: MatAutocompleteTrigger, auto: MatAutocomplete) {
    setTimeout((_: any) => {
      auto.options.forEach((item) => {
        item.deselect();
      });

      // this.control.reset();
      // this.control.setValue(this.value);
    }, 100);
  }
}
