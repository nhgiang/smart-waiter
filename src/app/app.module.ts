import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomHttpInterceptorService } from './services/custom-http-interceptor.service';
import {ModalModule} from 'ngx-bootstrap/modal';
import { ReactiveFormsModule } from '@angular/forms';
import { Ng2IziToastModule } from 'ng2-izitoast';
import { CloudinaryModule } from '@cloudinary/angular-5.x';
import * as cloudinary from 'cloudinary-core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaginationModule } from 'ngx-bootstrap/pagination';

const config =  {
  cloud_name: 'giang2000',
  upload_preset: 'sem4_cloundinary'
};
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    ReactiveFormsModule,
    Ng2IziToastModule,
    CloudinaryModule.forRoot(cloudinary, config),
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptorService,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
