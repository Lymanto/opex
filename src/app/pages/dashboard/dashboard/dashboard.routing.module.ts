import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { NewRequestComponent } from '../new-request/new-request.component';
import { CreateReallocationBudgetComponent } from '../create-reallocation-budget/create-reallocation-budget.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

const parents = [
  {
    route: '/dashboard',
    label: 'Dashboard',
  },
];

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'new-request',
    component: NewRequestComponent,
    data: {
      breadcrumb: {
        label: 'Detail',
        parents: parents,
      },
    },
  },
  {
    path: 'create-reallocation-budget',
    component: CreateReallocationBudgetComponent,
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
export class DashboardRoutingModule {}
