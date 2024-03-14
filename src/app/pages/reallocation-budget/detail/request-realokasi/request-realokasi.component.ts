import { Component } from '@angular/core';

@Component({
  selector: 'app-request-realokasi',
  templateUrl: './request-realokasi.component.html',
  styleUrls: ['./request-realokasi.component.css'],
})
export class RequestRealokasiComponent {
  isFilterActive: boolean = true;
  tabState: string = 'detailRequest';
}
