import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CreateReallocationBudgetComponent } from '../create-reallocation-budget/create-reallocation-budget.component';
import { DashboardComponent } from './dashboard.component';
import { NewRequestComponent } from '../new-request/new-request.component';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReuseableComponentModule } from 'src/app/component/reuseable-component.module';
import { AuthService } from 'src/app/services/auth.service';
import { SelectBoxComponent } from 'src/app/component/Form/select-box/select-box.component';

@NgModule({
  declarations: [
    CreateReallocationBudgetComponent,
    DashboardComponent,
    NewRequestComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ReuseableComponentModule,
  ],
  exports: [
    CreateReallocationBudgetComponent,
    DashboardComponent,
    NewRequestComponent,
  ],
  providers: [AuthService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardModule {}
