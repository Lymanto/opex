import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { GuidanceApplicationComponent } from './pages/guidance-application/guidance-application.component';
import { FeedbackApplicationComponent } from './pages/feedback-application/feedback-application.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  // {
  //   path: 'dashboard',
  //   component: DashboardComponent,
  // },
  // {
  //   path: 'dashboard/new-request',
  //   component: DashboardNewRequestComponent,
  // },
  // {
  //   path: 'dashboard/create-reallocation-budget',
  //   component: CreateReallocationBudgetComponent,
  // },
  // {
  //   path: 'need-approval',
  //   component: NeedApprovalComponent,
  // },
  // {
  //   path: 'need-approval/detail',
  //   component: DetailComponent,
  // },
  {
    path: 'dashboard',
    title: 'OpEx | Dashboard',
    loadChildren: () =>
      import('./pages/dashboard/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),

    data: {
      breadcrumb: {
        label: 'Dashboard',
      },
    },
    // canActivate: [AuthGuard],
  },
  {
    path: 'need-approval',
    title: 'OpEx | Need Approval',
    loadChildren: () =>
      import('./pages/need-approval/need-approval.module').then(
        (m) => m.NeedApprovalModule
      ),

    data: {
      breadcrumb: {
        label: 'Need Approval',
      },
    },
    // canActivate: [AuthGuard],
  },
  {
    path: 'reallocation-budget',
    title: 'OpEx | Reallocation Budget',
    loadChildren: () =>
      import('./pages/reallocation-budget/reallocation-budget.module').then(
        (m) => m.ReallocationBudgetModule
      ),

    data: {
      breadcrumb: {
        label: 'Reallocation Budget',
      },
    },
    // canActivate: [AuthGuard],
  },
  // {
  //   path: 'reallocation-budget/detail',
  //   component: RequestRealokasiComponent,
  // },
  // {
  //   path: 'reallocation-budget/general',
  //   component: GeneralComponent,
  // },
  // {
  //   path: 'reallocation-budget/realokasi-corporate',
  //   component: RealokasiCorporateComponent,
  // },
  // {
  //   path: 'reallocation-budget/reallocation-request',
  //   component: ReallocationRequestComponent,
  // },
  // {
  //   path: 'report/summary',
  //   component: SummaryComponent,
  // },
  // {
  //   path: 'report/view-budget',
  //   component: ViewBudgetComponent,
  // },
  // {
  //   path: 'report/personnel-summary',
  //   component: PersonnelSummaryComponent,
  // },
  {
    path: 'report',
    title: 'OpEx | Report',
    loadChildren: () =>
      import('./pages/report/report.module').then((m) => m.ReportModule),

    data: {
      breadcrumb: {
        label: 'Report',
      },
    },
    // canActivate: [AuthGuard],
  },
  {
    path: 'guidance-application',
    component: GuidanceApplicationComponent,
  },
  {
    path: 'feedback-application',
    component: FeedbackApplicationComponent,
  },
  // {
  //   path: 'master-data/summary',
  //   component: SummaryMasterData,
  // },
  // {
  //   path: 'master-data/view-budget',
  //   component: ViewBudgetMasterData,
  // },
  // {
  //   path: 'master-data/kurs-usd',
  //   component: KursUsdComponent,
  // },
  {
    path: 'master-data',
    title: 'OpEx | Master Data',
    loadChildren: () =>
      import('./pages/master-data/master-data.module').then(
        (m) => m.MasterDataModule
      ),

    data: {
      breadcrumb: {
        label: 'Master Data',
      },
    },
    // canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
