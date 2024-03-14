import { RouterModule, Routes } from '@angular/router';
import { SummaryComponent } from './summary/summary.component';
import { ViewBudgetComponent } from './view-budget/view-budget.component';
import { KursUsdComponent } from './kurs-usd/kurs-usd.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CostCenterComponent } from './cost-center/cost-center.component';
import { GLAccountComponent } from './glaccount/glaccount.component';

const parents = [
  {
    route: '/master-data',
    label: 'Master-Data',
  },
];

const routes: Routes = [
  {
    path: 'summary',
    component: SummaryComponent,
  },
  {
    path: 'view-budget',
    component: ViewBudgetComponent,
    data: {
      breadcrumb: {
        label: 'View Budget',
        parents: parents,
      },
    },
  },
  {
    path: 'kurs-usd',
    component: KursUsdComponent,
    data: {
      breadcrumb: {
        label: 'Kurs USD',
        parents: parents,
      },
    },
  },
  {
    path: 'cost-center',
    component: CostCenterComponent,
    data: {
      breadcrumb: {
        label: 'Cost Center',
        parents: parents,
      },
    },
  },
  {
    path: 'glaccount',
    component: GLAccountComponent,
    data: {
      breadcrumb: {
        label: 'GL Account',
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
export class MasterDataRoutingModule {}
