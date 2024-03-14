import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NeedApprovalRoutingModule } from './need-approval-routing.module';
import { DetailComponent } from './detail/detail.component';
import { NeedApprovalComponent } from './need-approval.component';
import { AuthService } from 'src/app/services/auth.service';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReuseableComponentModule } from 'src/app/component/reuseable-component.module';
import { SelectBoxComponent } from 'src/app/component/Form/select-box/select-box.component';

@NgModule({
  declarations: [NeedApprovalComponent, DetailComponent],
  imports: [
    CommonModule,
    NeedApprovalRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ReuseableComponentModule,
    // {
    //   defaultHostDisplay: 'inlineBlock', // default 'none'
    //   attachDefaultDimensionsIfNoneFound: true, //
    // }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [AuthService],
})
export class NeedApprovalModule {}
