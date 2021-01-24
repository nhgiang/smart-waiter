import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { CategoryComponent } from '../category/category.component';
import { CoreModule } from '../core/core.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormCategoryComponent } from '../category/form-category/form-category.component';
import { TableComponent } from '../table/table.component';
import { TableFormComponent } from '../table/table-form/table-form.component';
import { FileUploadModule } from 'ng2-file-upload';
import { OrderComponent } from '../order/order.component';
import { OrderFormComponent } from '../order/order-form/order-form.component';
import { BillComponent } from '../bill/bill.component';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    MainComponent,
    CategoryComponent,
    FormCategoryComponent,
    TableComponent,
    TableFormComponent,
    OrderComponent,
    OrderFormComponent,
    BillComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    CoreModule,
    RouterModule,
    FormsModule,
    ModalModule,
    ReactiveFormsModule,
    FileUploadModule,
    PaginationModule,
    ChartsModule
  ]
})
export class MainModule { }
