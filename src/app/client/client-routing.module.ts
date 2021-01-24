import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BarComponent } from './bar/bar.component';
import { ClientOrderDetailComponent } from './client-order-detail/client-order-detail.component';
import { ClientOrderComponent } from './client-order/client-order.component';
import { ClientComponent } from './client.component';


const routes: Routes = [
  {
    path: '',
    component: ClientComponent,
    children: [
      {
        path: '',
        redirectTo: 'order'
      },
      {
        path: 'order',
        component: ClientOrderComponent
      },
      {
        path: 'bar',
        component: BarComponent
      },
      {
        path: 'detail',
        component: ClientOrderDetailComponent
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
