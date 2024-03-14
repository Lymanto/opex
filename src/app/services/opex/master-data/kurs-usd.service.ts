import { HttpClient } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';

import { Observable, catchError, of } from 'rxjs';
import { HttpResult } from 'src/app/dto/http-result.dto';
import { kursType } from 'src/app/lib/types';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class KursUsdService {
  private url = `${environment.baseUrlOpex}/kurs`;
  constructor(private httpClient: HttpClient) {}

  postKurs(kurs: kursType) {
    return this.httpClient.post<kursType>(this.url, kurs);
  }
  editKurs(kurs: kursType) {
    return this.httpClient.put<kursType>(`${this.url}/${kurs.idKurs}`, kurs);
  }

  getAllKurs(
    page: number,
    perPage: number
  ): Observable<HttpResult<kursType[]>> {
    return this.httpClient.get<HttpResult<kursType[]>>(
      `${this.url}?page=${page}&perPage=${perPage}&orderBy=desc`
    );
  }
  getLastKurs(): Observable<HttpResult<kursType>> {
    const year: number = new Date().getFullYear();
    return this.httpClient.get<HttpResult<kursType>>(
      `${this.url}/years/${year}`
    );
  }
}
