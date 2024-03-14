import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RequestRealokasiComponent } from './detail/request-realokasi/request-realokasi.component';
import { ReallocationRequestComponent } from './reallocation-request/reallocation-request.component';
import { RealokasiCorporateComponent } from './realokasi-corporate/realokasi-corporate.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReuseableComponentModule } from 'src/app/component/reuseable-component.module';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralComponent } from './general/general.component';
import { ReallocationBudgetRoutingModule } from './reallocation-budget.routing.module';
import { SelectBoxComponent } from 'src/app/component/Form/select-box/select-box.component';

@NgModule({
  declarations: [
    GeneralComponent,
    RequestRealokasiComponent,
    ReallocationRequestComponent,
    RealokasiCorporateComponent,
  ],
  imports: [
    CommonModule,
    ReallocationBudgetRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ReuseableComponentModule,
  ],
  providers: [AuthService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    GeneralComponent,
    RequestRealokasiComponent,
    ReallocationRequestComponent,
    RealokasiCorporateComponent,
  ],
})
export class ReallocationBudgetModule {}
