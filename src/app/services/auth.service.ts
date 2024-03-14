import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/providers/http.service';
import { LocalStorageService } from './opex/local-storage/local-storage.service';
import { KeycloakResponseDTO } from '../dto/keycloak-response.dto';

@Injectable()
export class AuthService extends HttpService {
  localStorageService: any;

  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.localStorageService = new LocalStorageService();
  }

  async checkUserInfo(
    username: string,
    password: string
  ): Promise<KeycloakResponseDTO | null> {
    const keycloakFormBody = {
      grant_type: 'password',
      client_id: environment.keycloakClientId,
      username: username,
      password: password,
    };

    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );

    const urlEncoded = this.encodeFormData(keycloakFormBody);

    const request = this.postCustomUrl(
      environment.keycloakUrl +
        '/realms/' +
        environment.realm +
        '/protocol/openid-connect/token',
      urlEncoded,
      headers
    );

    const response = await lastValueFrom(request);

    if (!response) {
      return null;
    }

    const results = response as KeycloakResponseDTO;

    return results;
  }
}
