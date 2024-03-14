import {
  Component,
  EventEmitter,
  Input,
  Output,
  forwardRef,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { format } from 'date-fns';

@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputDateComponent),
      multi: true,
    },
  ],
})
export class InputDateComponent {
  _inputDate!: string;
  @Input() label: string = '';
  @Input() value: string = '';
  @Input() id: string = '';
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() isAsk: boolean = false;

  @Input() isDisabled: boolean = false;
  @Input() isReadOnly: boolean = false;
  @Output() currentValue: EventEmitter<string> = new EventEmitter<string>();
  focus = false;
  get date(): string {
    return this._inputDate;
  }

  set date(value: string) {
    this._inputDate = value;
    this.propagateChange(this._inputDate);
  }

  writeValue(value: string) {
    if (value !== undefined) {
      this.date = value;
    }
  }

  propagateChange = (_: any) => {};
  propagateTouched = (_: any) => {};

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any) {
    this.propagateTouched = fn;
  }

  touched($event: any) {
    this.propagateTouched($event);
  }
  onChange(val: any) {
    this.currentValue.emit(val.target.value);
  }
}
