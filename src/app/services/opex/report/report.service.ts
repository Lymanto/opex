import { group } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpResult } from 'src/app/dto/http-result.dto';
import {
  BudgetMTDYTD,
  RKAPType,
  ViewBudgetMasterData,
} from 'src/app/lib/types';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private url = `${environment.baseUrlOpex}/report`;
  constructor(private httpClient: HttpClient) {}

  getBudgetByFilter(
    years: string | null,
    costCenter: string | null
  ): Observable<HttpResult<ViewBudgetMasterData[]>> {
    return this.httpClient.get<HttpResult<ViewBudgetMasterData[]>>(
      `${this.url}/budget?years=${years}${costCenter}`
    );
  }
  getPersonalSummaryByFilter(
    page: number | null,
    dinas: string | null,
    month: string | null,
    years: string | null,
    type: string | null,
    status: string | null,
    requestBy: string | null,
    responsibleOfRequest: string | null
  ): Observable<HttpResult<RKAPType[]>> {
    return this.httpClient.get<HttpResult<RKAPType[]>>(
      `${this.url}/summary?page=${page}${dinas}${month}${years}${type}${status}${requestBy}${responsibleOfRequest}`
    );
  }
  getRequestBy(): Observable<HttpResult<string[]>> {
    return this.httpClient.get<HttpResult<string[]>>(
      `${this.url}/all/requestby`
    );
  }
  getResponsible(): Observable<HttpResult<string[]>> {
    return this.httpClient.get<HttpResult<string[]>>(
      `${this.url}/all/responsible`
    );
  }
  getBudgetMTDYTD(
    dinas: string,
    groupGL: string,
    groupDetail: string
  ): Observable<HttpResult<BudgetMTDYTD[]>> {
    return this.httpClient.get<HttpResult<BudgetMTDYTD[]>>(
      `${this.url}/count/?dinas=${dinas}&groupGl=${groupGL}&groupDetail=${groupDetail}`
    );
  }
}
