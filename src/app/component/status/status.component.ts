import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css'],
})
export class StatusComponent implements OnInit {
  @Input() status!:
    | 'OPEN'
    | 'PROGRESS'
    | 'CLOSE'
    | 'REVISE'
    | 'REJECT'
    | 'APPROVE'
    | 'WAITING_APPROVAL'
    | string
    | undefined;
  statusClass!: string;
  ngOnInit() {
    this.setColor();
  }
  setColor(): void {
    switch (this.status) {
      case 'OPEN': {
        this.statusClass =
          ' border-tertiary-br-gold text-tertiary-tx-gold bg-tertiary-bg-gold ';
        break;
      }
      case 'APPROVE': {
        this.statusClass =
          ' border-tertiary-br-green text-tertiary-tx-green bg-tertiary-bg-green ';
        break;
      }
      case 'PROGRESS': {
        this.statusClass =
          ' border-tertiary-br-blue text-tertiary-tx-blue bg-tertiary-bg-blue ';
        break;
      }
      case 'CLOSE': {
        this.statusClass =
          ' border-tertiary-br-green text-tertiary-tx-green bg-tertiary-bg-green ';
        break;
      }
      case 'REVISE': {
        this.statusClass =
          ' border-tertiary-br-tosca text-tertiary-tx-tosca bg-tertiary-bg-tosca ';
        break;
      }
      case 'WAITING_APPROVAL': {
        this.statusClass =
          ' border-tertiary-br-blue text-tertiary-tx-blue bg-tertiary-bg-blue ';
        break;
      }
      case 'REJECT': {
        this.statusClass =
          ' border-tertiary-br-red text-tertiary-tx-red bg-tertiary-bg-red ';

        break;
      }
    }
  }
}
