import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BaseApi } from './base-api.class';
import { baseUrl } from './base-url';

@Injectable({
  providedIn: 'root'
})
export class CustomService extends BaseApi {

  constructor(
    httpClient: HttpClient,
    @Inject(baseUrl) protected hostUrl: string,
  ) {
    super(httpClient);
    this.setEndpoint(hostUrl, 'custom');
  }

  uploadFile(formData) {
    return this.httpClient.post(this.createUrl('upload-file'), formData, { responseType: 'text' })
  }
}
