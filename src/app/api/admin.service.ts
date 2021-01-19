import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BaseApi } from './base-api.class';
import { baseUrl } from './base-url';

@Injectable({
  providedIn: 'root'
})
export class AdminService extends BaseApi{

  constructor(
    httpClient: HttpClient,
    @Inject(baseUrl) protected hostUrl: string,
  ) {
    super(httpClient);
    this.setEndpoint(hostUrl, 'admin');
  }

  item = {
    getItems: (keyword) => this.httpClient.get<any>(this.createUrl(`item/getItems?keyword=${keyword}`)),
    create: (command) => this.httpClient.post(this.createUrl('item/save'), command),
    delete: (id) => this.httpClient.delete(this.createUrl(`item/delete?id=${id}`),{responseType: 'text'}),
    getById: (id) => this.httpClient.get<any>(this.createUrl(`item/getItem?id=${id}`))
  };
  table = {
    getTables: (keyword) => this.httpClient.get<any>(this.createUrl(`table/getTables?keyword=${keyword}`)),
    create: (command) => this.httpClient.post(this.createUrl('table/save'), command),
    delete: (id) => this.httpClient.delete(this.createUrl(`table/delete?id=${id}`),{responseType: 'text'}),
    getById: (id) => this.httpClient.get<any>(this.createUrl(`table/getTable?id=${id}`))
  };
  order = {
    getOrders: (keyword) => this.httpClient.get<any>(`${this.hostUrl}/order/getOrders`),
    getOrder: (id) => this.httpClient.get<any>(`${this.hostUrl}/order/getOrder?id=${id}`)
  };
}
