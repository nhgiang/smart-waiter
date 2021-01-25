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
    this.socketService.msg.subscribe(body => {
      if (body.type === 'updateItem') {
        this.tables.find(t => t.id === body.tableId);
        this.orders.forEach(order => {
          this.tables.forEach(t => {
            if (t.id === body.tableId && order.id === body.id) {
              order.items = body.items;
              if (order.items.some(element => element.status === 'NEW' || element.status === 'IN_PROGRESS')) {
                t.statusTable = 1;
                // tslint:disable-next-line: max-line-length
              } else if (order.items && t.orderItemList.filter(element => element.status === 'DELIVERED' || element.status === 'DONE').length === order.items.length) {
                t.statusTable = 2;
              }
            }
          });
        });
      } else if (body.type === 'create') {
        this.orders.push(body);
        this.orders.forEach(order => {
          this.tables.forEach(t => {
            if (t.id === body.tableId && order.id === body.id) {
              if (order.items.some(element => element.status === 'NEW' || element.status === 'IN_PROGRESS')) {
                t.statusTable = 1;
                // tslint:disable-next-line: max-line-length
              } else if (order.items && t.items.filter(element => element.status === 'DELIVERED' || element.status === 'DONE').length === order.items.length) {
                t.statusTable = 2;
              }
            }
          });
        });
      } else if (body.type === 'updateOrderStatus') {
        if (body.status === 'PAYMENT') {
          this.orders.forEach(order => {
            this.tables.forEach(t => {
              if (t.id === body.tableId && order.id === body.id) {
                t.statusTable = 3;
              }
            });
          });
        } else {
          this.orders.forEach(order => {
            this.tables.forEach(t => {
              if (t.id === body.tableId && order.id === body.id) {
                t.statusTable = 0;
              }
            });
          });
        }
      }
    });
  }

  fetch() {
    forkJoin({
      orders: this.adminService.order.getOrders(''),
      tables: this.adminService.table.getTables('')
    }).subscribe(res => {
      this.orders = res.orders.filter(r => r.status !== 'PAID');
      this.tables = res.tables.sort((a, b) => a.name.split('tb')[1] - b.name.split('tb')[1]);
      this.orders.forEach(order => {
        this.tables.forEach(table => {
          if (table.id === order.tableId) {
            if (order.items.some(element => element.status === 'NEW' || element.status === 'IN_PROGRESS')) {
              table.statusTable = 1;
              // tslint:disable-next-line: max-line-length
            } else if (order.items && order.items.filter(element => element.status === 'DELIVERED' || element.status === 'DONE').length === order.items.length && order.status !== 'PAYMENT') {
              table.statusTable = 2;
            } else if (order.status === 'PAYMENT') {
              table.statusTable = 3;
            }
          }
        });
      });
    });
  }

  showOrder(tableId) {
    console.log(tableId);
    this.bottomSheet.open(BottomSheetComponent, {
      data: this.orders.find(order => order.tableId === tableId && order.status)
    });
  }
}
