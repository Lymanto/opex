import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpResult } from 'src/app/dto/http-result.dto';
import { glAccountType } from 'src/app/lib/types';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GlaccountService {
  constructor(private httpClient: HttpClient) {}

  private url = `${environment.baseUrlOpex}/m-gl-account`;
  getAllGroupGL(page: string): Observable<HttpResult<glAccountType[]>> {
    return this.httpClient.get<HttpResult<glAccountType[]>>(
      `${this.url}/pagination?page=${page}&orderBy=desc`
    );
  }
  postGLAccount(data: glAccountType): Observable<HttpResult<glAccountType>> {
    return this.httpClient.post<HttpResult<glAccountType>>(`${this.url}`, data);
  }
  putGLAccount(
    data: glAccountType,
    id: number
  ): Observable<HttpResult<glAccountType>> {
    return this.httpClient.put<HttpResult<glAccountType>>(
      `${this.url}/update/${id}`,
      data
    );
  }
}
