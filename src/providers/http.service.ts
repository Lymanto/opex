import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export abstract class HttpService implements OnDestroy {
  http: HttpClient;

  private readonly unsubscribe$: Subject<void> = new Subject();

  constructor(client: HttpClient) {
    this.http = client;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  encodeFormData(formData: any) {
    const urlSearchParams = new URLSearchParams();

    for (const key of Object.keys(formData)) {
      urlSearchParams.append(key, formData[key]);
    }

    return urlSearchParams.toString();
  }

  postCustomUrl<T>(
    url: string,
    requestBody: any,
    headers?: any
  ): Observable<T> {
    return this.http.post<T>(url, requestBody, { headers });
  }
}
