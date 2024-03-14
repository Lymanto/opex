import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpResult } from 'src/app/dto/http-result.dto';
import { RealizationDTO } from 'src/app/dto/request-verification.dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RequestVerificationService {
  private url = `${environment.baseUrlOpex}/realization`;
  private readonly headers = new HttpHeaders().set(
    'x-api-key',
    '343C-ED0B-4137-B27E'
  );
  constructor(private httpClient: HttpClient) {}

  getRequestVerification(
    idRealization: number
  ): Observable<HttpResult<RealizationDTO[]>> {
    return this.httpClient.get<HttpResult<RealizationDTO[]>>(
      `${this.url}/${idRealization}`
    );
  }
}
