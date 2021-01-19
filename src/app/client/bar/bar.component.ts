import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { forkJoin } from 'rxjs';
import { AdminService } from 'src/app/api/admin.service';
import { SocketioService } from 'src/app/services/socketio.service';
import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit {
  orders: any[];
  tables: any[];
  constructor(
    private adminService: AdminService,
    private bottomSheet: MatBottomSheet,
    private socketService: SocketioService
  ) { }

  ngOnInit(): void {
    this.fetch();
  }

  fetch() {
    forkJoin({
      orders: this.adminService.order.getOrders(''),
      tables: this.adminService.table.getTables('')
    }).subscribe(res => {
      this.orders = res.orders.filter(r => r.status !== 'PAID' && r.status !== 'PAYMENT');
      this.tables = res.tables;
      this.orders.forEach(order => {
        this.tables.forEach(table => {
          // if (table.id === order.tableId) {
          if (order.orderItemList.some(element => element.status === 'NEW' || element.status === 'IN_PROGRESS')) {
            table.statusTable = 1;
            // tslint:disable-next-line: max-line-length
          } else if (order.orderItemList && order.orderItemList.filter(element => element.status === 'DELIVERED' || element.status === 'DONE').length === order.orderItemList.length) {
            table.statusTable = 2;
          }
          // }
        });
      });
    });
  }

  showOrder(tableId) {
    this.bottomSheet.open(BottomSheetComponent, {
      data: this.orders[0]
    });
  }
}
