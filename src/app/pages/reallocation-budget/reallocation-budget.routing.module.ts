import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralComponent } from './general/general.component';
import { ReallocationRequestComponent } from './reallocation-request/reallocation-request.component';
import { RealokasiCorporateComponent } from './realokasi-corporate/realokasi-corporate.component';
import { RequestRealokasiComponent } from './detail/request-realokasi/request-realokasi.component';

const parents = [
  {
    route: '/reallocation-budget',
    label: 'Reallocation Budget',
  },
];

const routes: Routes = [
  {
    path: 'general',
    component: GeneralComponent,
  },
  {
    path: 'reallocation-request',
    component: ReallocationRequestComponent,
    data: {
      breadcrumb: {
        label: 'Reallocation Request',
        parents: parents,
      },
    },
  },
  {
    path: 'request-realokasi',
    component: RequestRealokasiComponent,
    data: {
      breadcrumb: {
        label: 'RRequest Realokasi',
        parents: parents,
      },
    },
  },
  {
    path: 'realokasi-corporate',
    component: RealokasiCorporateComponent,
    data: {
      breadcrumb: {
        label: 'Realokasi Corporate',
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
export class ReallocationBudgetRoutingModule {}
