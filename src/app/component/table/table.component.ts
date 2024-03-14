import { Component, Input, OnInit } from '@angular/core';
import { ActivationEnd } from '@angular/router';
import { newRequestUploadType } from 'src/app/lib/types';

export const tabledata = [
  {
    src: 'assets/images/icons/ic-arrow-down.svg',
    srcactive: 'assets/images/icons/ic-arrow-up-active.svg',
  },
];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  tabledata = tabledata;
  @Input() requestBody: newRequestUploadType[] = [];
  @Input() header!: string[];
  statusType: string[] = ['Open', 'Progress', 'Closed', 'Revise', 'Reject'];
  ngOnInit() {}
  checkStatus(value: string): boolean {
    if (this.statusType.includes(value)) {
      return true;
    }
    return false;
  }

  head = [
    'No',
    'Document Name',
    'Doc. Type',
    'Size',
    'Upload by',
    'Department by',
    'Upload Date',
  ];

  kursheaders = ['No.', 'Years', 'Value (IDR)', 'Action'];

  masterdatasummaryheaders = [
    'Action',
    'Financial Indicators',
    'Budget (MTD)',
    'Actual (MTD)',
    'Achievment (MTD)',
    'Budget (YTD)',
    'Actual (YTD)',
    'Achievment (YTD)',
  ];

  reallocationbudgetgeneralheaders = [
    'No',
    'Ta Reff',
    'Type Of Reallocation',
    'No. of Request',
    'Entry Date',
    'Status',
    'Status To',
    'Department To',
    'Action',
  ];

  reallocationcorporateheaders = [
    'No',
    'Entry Date',
    'Dinas',
    'TA Reff',
    'Amount Submission Total',
    'Status',
    'Status To',
    'Department To',
    'Action',
  ];

  personalsummaryheaders = [
    'No',
    'Dinas',
    'Month',
    'Years',
    'No Of Request',
    'Type Of Submission',
    'Submission Value (USD)',
    'Status',
    'Request by',
    'Responsible of Request',
    'Action',
  ];
  remarkHeaders = [
    'No',
    'Action',
    'Date of Remark',
    'Status',
    'Status From',
    'Department From',
    'Status To',
    'Department To',
  ];

  show: boolean = false;
  activeId: string = 'not-active';
  onclick() {
    this.show = !this.show;
  }
  onClick(value: string) {
    if (this.activeId == 'not-active') {
      this.activeId = value;
    } else if (this.activeId != value) {
      this.activeId = value;
    } else {
      this.activeId = 'not-active';
    }
  }

  @Input() type!: string;
}
