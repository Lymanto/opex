import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Observable, lastValueFrom } from 'rxjs';
import { LocalServiceConst } from 'src/app/constanta/local-service-constanta';
import {
  HttpResultSoeAllUser,
  HttpResultSoeSpesificUser,
} from 'src/app/dto/http-result.dto';
import { UserDataDTO } from 'src/app/dto/user-data-dto';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class GetAllUsersService {
  private url = `${environment.baseUrlSoe}/v2/employee`;
  // localStorageService: any;
  constructor(
    private httpClient: HttpClient,
    private readonly keycloakService: KeycloakService,
    private readonly localStorageService: LocalStorageService
  ) {}
  getAllUsers(dinas: string): Observable<HttpResultSoeAllUser<any[]>> {
    return this.httpClient.get<HttpResultSoeAllUser<any[]>>(
      `${this.url}?page=1&perPage=99999&orderColumn=personalName&orderBy=asc&searchByUnit=${dinas}`,
      {
        headers: {
          'x-api-key': environment.apiKey,
        },
      }
    );
  }
  getSpecificUsers(id: number): Observable<HttpResultSoeAllUser<any>> {
    return this.httpClient.get<HttpResultSoeAllUser<any>>(`${this.url}/${id}`, {
      headers: {
        'x-api-key': environment.apiKey,
      },
      params: {
        superior: true,
      },
    });
  }

  getPersonalInformationFromCache(): UserDataDTO | null {
    if (localStorage.getItem(LocalServiceConst.USER_INFO)) {
      let _userInfo: any = {
        ...this.localStorageService.getData(LocalServiceConst.USER_INFO),
      };
      const _result = JSON.parse(_userInfo?._result);
      return _result;
    } else {
      return null;
    }
  }

  getDetailUsers(
    id: string
  ): Observable<HttpResultSoeSpesificUser<UserDataDTO>> {
    return this.httpClient.get<HttpResultSoeSpesificUser<UserDataDTO>>(
      `${this.url}/${id}`,
      {
        headers: {
          'x-api-key': environment.apiKey,
        },
      }
    );
  }

  async getUserInfo(personalNumber?: string): Promise<UserDataDTO> {
    if (!personalNumber) personalNumber = this.keycloakService.getUsername();

    const request = this.httpClient.get(
      environment.baseUrlSoe + '/v2/employee/' + personalNumber
    );

    const response = (await lastValueFrom(
      request
    )) as HttpResultSoeSpesificUser<UserDataDTO>;

    const results = response['body'] as UserDataDTO;

    return results;
  }
}
