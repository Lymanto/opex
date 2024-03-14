import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SummaryComponent } from './summary/summary.component';
import { KursUsdComponent } from './kurs-usd/kurs-usd.component';
import { ViewBudgetComponent } from './view-budget/view-budget.component';
import { CommonModule } from '@angular/common';
import { MasterDataRoutingModule } from './master-data.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReuseableComponentModule } from 'src/app/component/reuseable-component.module';
import { AuthService } from 'src/app/services/auth.service';
import { SelectBoxComponent } from 'src/app/component/Form/select-box/select-box.component';
import { CostCenterComponent } from './cost-center/cost-center.component';
import { GLAccountComponent } from './glaccount/glaccount.component';

@NgModule({
  declarations: [
    SummaryComponent,
    KursUsdComponent,
    ViewBudgetComponent,
    CostCenterComponent,
    GLAccountComponent,
  ],
  imports: [
    CommonModule,
    MasterDataRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ReuseableComponentModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [AuthService],
  exports: [
    SummaryComponent,
    KursUsdComponent,
    ViewBudgetComponent,
    CostCenterComponent,
    GLAccountComponent,
  ],
})
export class MasterDataModule {}
