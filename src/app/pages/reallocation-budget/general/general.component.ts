import { Component } from '@angular/core';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css'],
})
export class GeneralComponent {
  isFilterActive: boolean = true;
  public needApproval: string = '100';
  ngOnInit(): void {
    this.needApproval;
  }
}
