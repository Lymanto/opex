import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpResult } from 'src/app/dto/http-result.dto';
import { documentCategoryType } from 'src/app/lib/types';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DocumentCategoryService {
  private url = `${environment.baseUrlOpex}/upload/category`;

  private readonly headers = new HttpHeaders().set(
    'x-api-key',
    '343C-ED0B-4137-B27E'
  );

  constructor(private httpClient: HttpClient) {}

  getAllGroup(): Observable<HttpResult<documentCategoryType[]>> {
    return this.httpClient.get<HttpResult<documentCategoryType[]>>(this.url, {
      headers: this.headers,
    });
  }
}
