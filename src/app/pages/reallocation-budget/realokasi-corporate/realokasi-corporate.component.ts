import { Component } from '@angular/core';

@Component({
  selector: 'app-realokasi-corporate',
  templateUrl: './realokasi-corporate.component.html',
  styleUrls: ['./realokasi-corporate.component.css'],
})
export class RealokasiCorporateComponent {
  isFilterActive: boolean = true;
  public needApproval: string = '100';
  ngOnInit(): void {
    this.needApproval;
  }
}
