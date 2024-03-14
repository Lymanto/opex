import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpResult } from 'src/app/dto/http-result.dto';
import { CostCenterType } from 'src/app/lib/types';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CostCenterService {
  private url = `${environment.baseUrlOpex}/m-cost-center`;

  constructor(private httpClient: HttpClient) {}

  getCostCenterByBidang(
    bidang: string
  ): Observable<HttpResult<CostCenterType[]>> {
    return this.httpClient.get<HttpResult<CostCenterType[]>>(
      `${this.url}/bidang/${bidang}`
    );
  }
  getDinas(): Observable<HttpResult<string[]>> {
    return this.httpClient.get<HttpResult<string[]>>(`${this.url}/all/group`);
  }
  getAllCostCenter(): Observable<HttpResult<CostCenterType[]>> {
    return this.httpClient.get<HttpResult<CostCenterType[]>>(`${this.url}/all`);
  }
  getAllCostCenterPagination(
    page: string
  ): Observable<HttpResult<CostCenterType[]>> {
    return this.httpClient.get<HttpResult<CostCenterType[]>>(
      `${this.url}/pagination?page=${page}&orderBy=desc`
    );
  }
  postCostCenter(data: CostCenterType): Observable<HttpResult<CostCenterType>> {
    return this.httpClient.post<HttpResult<CostCenterType>>(
      `${this.url}`,
      data
    );
  }
  putCostCenter(
    data: CostCenterType,
    id: number
  ): Observable<HttpResult<CostCenterType>> {
    return this.httpClient.put<HttpResult<CostCenterType>>(
      `${this.url}/update/${id}`,
      data
    );
  }
}
