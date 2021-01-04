import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private httpClient: HttpClient) { }

  upload(val) {
    console.log(val)
    return this.httpClient.post(`https://api.cloudinary.com/v1_1/giang2000/image/upload`, val, { headers: { 'content-type': 'multipart/form-data' } })
  }
}
