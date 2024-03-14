import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ButtonComponent } from './button/button.component';
import { CardComponent } from './card/card.component';
import { InputDateComponent } from './Form/input-date/input-date.component';
import { InputTextComponent } from './Form/input-text/input-text.component';
import { TextareaComponent } from './Form/textarea/textarea.component';
import { ItemComponent } from './item/item.component';
import { ItemReallocationComponent } from './item-reallocation/item-reallocation.component';
import { ModalComponent } from './modal/modal.component';
import { ReallocatonBudgetComponent } from './need-approval-detail/reallocaton-budget/reallocaton-budget.component';
import { RemarkComponent } from './need-approval-detail/remark/remark.component';
import { RequestVerificationComponent } from './need-approval-detail/request-verification/request-verification.component';
import { TrackingApprovalComponent } from './need-approval-detail/tracking-approval/tracking-approval.component';
import { AsyncPipe, CommonModule, NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from './table/table.component';
import { PaginationComponent } from './pagination/pagination.component';
import { LayoutComponent } from './layout/layout.component';
import { TopnavComponent } from './topnav/topnav.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { StatusComponent } from './status/status.component';
import { SelectBoxComponent } from './Form/select-box/select-box.component';
import { NgChartsModule } from 'ng2-charts';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { StatusPercentageComponent } from './status-percentage/status-percentage.component';
import { TrackingApprovalReallocationComponent } from './reallocation-budget/tracking-approval/tracking-approval-reallocation.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    StatusComponent,
    ButtonComponent,
    InputDateComponent,
    InputTextComponent,
    TextareaComponent,
    ItemComponent,
    ItemReallocationComponent,
    ModalComponent,
    ReallocatonBudgetComponent,
    RemarkComponent,
    RequestVerificationComponent,
    TableComponent,
    PaginationComponent,
    LayoutComponent,
    TopnavComponent,
    SidebarComponent,
    StatusPercentageComponent,
    CardComponent,
    TrackingApprovalComponent,
    TrackingApprovalReallocationComponent,
    SelectBoxComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgChartsModule,
    CKEditorModule,
    MatAutocompleteModule,
    NgFor,
    NgIf,
    AsyncPipe,
  ],
  exports: [
    StatusComponent,
    ButtonComponent,
    InputDateComponent,
    InputTextComponent,
    TextareaComponent,
    ItemComponent,
    ItemReallocationComponent,
    ModalComponent,
    ReallocatonBudgetComponent,
    RemarkComponent,
    RequestVerificationComponent,
    TableComponent,
    PaginationComponent,
    LayoutComponent,
    TopnavComponent,
    SidebarComponent,
    StatusPercentageComponent,
    CardComponent,
    TrackingApprovalComponent,
    TrackingApprovalReallocationComponent,
    SelectBoxComponent,
  ],
})
export class ReuseableComponentModule {}
