import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BaseApi } from './base-api.class';
import { baseUrl } from './base-url';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService extends BaseApi {
  constructor(
    httpClient: HttpClient,
    @Inject(baseUrl) protected hostUrl: string,
  ) {
    super(httpClient);
    this.setEndpoint(hostUrl, 'api');
  }

  login(body) {
    return this.httpClient.post<any>(this.createUrl('auth'), body);
  }
}
