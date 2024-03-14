import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { HttpResult } from 'src/app/dto/http-result.dto';
import { CreateRequestRealizationType, glAccountType } from 'src/app/lib/types';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NewRequestService {
  private url = `${environment.baseUrlOpex}/m-gl-account`;

  private readonly headers = new HttpHeaders().set(
    'x-api-key',
    '343C-ED0B-4137-B27E'
  );

  constructor(private httpClient: HttpClient) {}

  getAllGroup(): Observable<HttpResult<glAccountType[]>> {
    return this.httpClient.get<HttpResult<glAccountType[]>>(
      `${this.url}/all/group`,
      {
        headers: this.headers,
      }
    );
  }
  getAllRealization(
    page: number = 1,
    perPage: number = 10,
    years?: string,
    requestNumber?: string,
    status?: string,
    type?: string,
    dinas?: string,
    entryDateFrom?: string,
    entryDateTo?: string
  ): Observable<HttpResult<any[]>> {
    return this.httpClient.get<HttpResult<any[]>>(
      `${environment.baseUrlOpex}/dashboard/all?page=${page}&perPage=${perPage}&orderBy=desc${years}${requestNumber}${status}${type}${dinas}${entryDateFrom}${entryDateTo}`
    );
  }
  getPercentage(): Observable<HttpResult<any[]>> {
    return this.httpClient.get<HttpResult<any[]>>(
      `${environment.baseUrlOpex}/dashboard/type`
    );
  }
  postSaveCreateRequestRealization(data: FormData) {
    return this.httpClient.post<FormData>(
      `${environment.baseUrlOpex}/realization/save`,
      data
    );
  }
  postSubmitCreateRequestRealization(data: FormData) {
    return this.httpClient.post<FormData>(
      `${environment.baseUrlOpex}/realization/submit`,
      data
    );
  }
  getAllGroupGL(groupGl: string): Observable<HttpResult<glAccountType[]>> {
    return this.httpClient.get<HttpResult<glAccountType[]>>(
      `${this.url}/all/group/${groupGl}`,
      {
        headers: this.headers,
      }
    );
  }
  getAvailable(
    idGlAccount: number | null | undefined,
    idCostCenter: number | null | undefined
  ): Observable<HttpResult<any[]>> {
    return this.httpClient.get<HttpResult<any[]>>(
      `${environment.baseUrlOpex}/realization/${idGlAccount}/${idCostCenter}/calculate-total`
    );
  }
}
