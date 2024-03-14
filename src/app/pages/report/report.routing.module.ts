import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SummaryComponent } from './summary/summary.component';
import { ViewBudgetComponent } from './view-budget/view-budget.component';
import { PersonnelSummaryComponent } from './personnel-summary/personnel-summary.component';

const parents = [
  {
    route: '/report',
    label: 'Report',
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
    path: 'personnel-summary',
    component: PersonnelSummaryComponent,
    data: {
      breadcrumb: {
        label: 'Personnel Summary',
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
export class ReportRoutingModule {}
