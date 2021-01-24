import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BillComponent } from '../bill/bill.component';
import { CategoryComponent } from '../category/category.component';
import { OrderComponent } from '../order/order.component';
import { TableComponent } from '../table/table.component';
import { MainComponent } from './main.component';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'category',
      },
      {
        path: 'category',
        component: CategoryComponent
      },
      {
        path: 'table',
        component: TableComponent
      },
      {
        path: 'order',
        component: OrderComponent
      },
      {
        path: 'bill',
        component: BillComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
