import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NeedApprovalComponent } from './need-approval.component';
import { DetailComponent } from './detail/detail.component';

const parents = [
  {
    route: '/need-approval',
    label: 'Need Approval',
  },
];

const routes: Routes = [
  {
    path: '',
    component: NeedApprovalComponent,
  },
  {
    path: 'detail/:id',
    component: DetailComponent,
    data: {
      breadcrumb: {
        label: 'Detail',
        parents: parents,
      },
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NeedApprovalRoutingModule {}
