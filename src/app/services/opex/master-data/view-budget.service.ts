import { HttpClient } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';

import { Observable, catchError, of } from 'rxjs';
import { HttpResult } from 'src/app/dto/http-result.dto';
import {
  RKAPType,
  UploadRKAP,
  ViewBudgetMasterData,
  kursType,
} from 'src/app/lib/types';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ViewBudgetService {
  private url = `${environment.baseUrlOpex}/budget`;
  constructor(private httpClient: HttpClient) {}

  postRKAP(rkap: FormData) {
    return this.httpClient.post<any>(`${this.url}/upload`, rkap);
  }
  getRKAP(): Observable<HttpResult<RKAPType[]>> {
    return this.httpClient.get<HttpResult<RKAPType[]>>(`${this.url}/all`);
  }
  getRKAPByFilter(
    years: string | null,
    costCenter: string | null,
    percentage: string | null
  ): Observable<HttpResult<ViewBudgetMasterData>> {
    return this.httpClient.get<HttpResult<ViewBudgetMasterData>>(
      `${this.url}/all/filter?years=${years}${costCenter}${percentage}`
    );
  }
}
