import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PersonnelSummaryComponent } from './personnel-summary/personnel-summary.component';
import { SummaryComponent } from './summary/summary.component';
import { ViewBudgetComponent } from './view-budget/view-budget.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReuseableComponentModule } from 'src/app/component/reuseable-component.module';
import { AuthService } from 'src/app/services/auth.service';
import { ReportRoutingModule } from './report.routing.module';
import { SelectBoxComponent } from 'src/app/component/Form/select-box/select-box.component';

@NgModule({
  declarations: [
    SummaryComponent,
    PersonnelSummaryComponent,
    ViewBudgetComponent,
  ],
  imports: [
    ReuseableComponentModule,
    CommonModule,
    ReportRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AuthService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [SummaryComponent, PersonnelSummaryComponent, ViewBudgetComponent],
})
export class ReportModule {}
