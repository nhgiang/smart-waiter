import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientOrderComponent } from './client-order/client-order.component';
import { ClientComponent } from './client.component';
import { ClientRoutingModule } from './client-routing.module';
import { BarComponent } from './bar/bar.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { BottomSheetComponent } from './bar/bottom-sheet/bottom-sheet.component';
import { ClientOrderDetailComponent } from './client-order-detail/client-order-detail.component';


@NgModule({
  declarations: [
    ClientComponent,
    ClientOrderComponent,
    BarComponent,
    BottomSheetComponent,
    ClientOrderDetailComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    MatBottomSheetModule
  ]
})
export class ClientModule { }
