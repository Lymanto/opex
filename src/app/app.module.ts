import {
  APP_INITIALIZER,
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StatusPercentageComponent } from './component/status-percentage/status-percentage.component';
import { NgChartsModule } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GuidanceApplicationComponent } from './pages/guidance-application/guidance-application.component';
import { FeedbackApplicationComponent } from './pages/feedback-application/feedback-application.component';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { environment } from 'src/environments/environment';
import { HttpSoeApiHeader } from 'src/providers/http-soe-api-header';
import { CommonModule } from '@angular/common';
import { ReuseableComponentModule } from './component/reuseable-component.module';
import { NeedApprovalModule } from './pages/need-approval/need-approval.module';
import { ReportModule } from './pages/report/report.module';
import { MasterDataModule } from './pages/master-data/master-data.module';
import { ReallocationBudgetModule } from './pages/reallocation-budget/reallocation-budget.module';
import { DashboardModule } from './pages/dashboard/dashboard/dashboard.module';

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: environment.keycloakUrl,
        realm: environment.realm,
        clientId: environment.keycloakClientId,
      },
      loadUserProfileAtStartUp: true,
      enableBearerInterceptor: true,
      bearerPrefix: 'Bearer',
      bearerExcludedUrls: ['assets/'],
      initOptions: {
        onLoad: 'login-required',
        // silentCheckSsoRedirectUri:
        //   window.location.origin + '/assets/silent-check-sso.html',
      },
    });
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GuidanceApplicationComponent,
    FeedbackApplicationComponent,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpSoeApiHeader,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgChartsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CKEditorModule,
    FormsModule,
    KeycloakAngularModule,
    CommonModule,
    ReuseableComponentModule,
    // NeedApprovalModule,
    // ReportModule,
    // MasterDataModule,
    // ReallocationBudgetModule,
    // DashboardModule,
  ],
})
export class AppModule {}
