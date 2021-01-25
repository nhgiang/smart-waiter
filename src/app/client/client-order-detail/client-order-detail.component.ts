import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AdminService } from 'src/app/api/admin.service';
import { SocketioService } from 'src/app/services/socketio.service';
import { storageUtils } from 'utils/storage';

@Component({
  selector: 'app-client-order-detail',
  templateUrl: './client-order-detail.component.html',
  styleUrls: ['./client-order-detail.component.scss']
})
export class ClientOrderDetailComponent implements OnInit {
  token: any;
  order: any;
  helper = new JwtHelperService();
  tableId: any;
  constructor(
    private admin: AdminService,
    private socketService: SocketioService
  ) { }

  ngOnInit(): void {
    this.token = this.helper.decodeToken(storageUtils.get('token'));
    this.fecthOrder();
    this.socketService.msg.subscribe(body => {
      if (body.type === 'updateItemStatus') {
        this.order = body;
      }
    });
  }

  fecthOrder() {
    this.admin.table.getTables('').subscribe(tables => {
      this.tableId = tables.find(t => this.token.jti === t.loginTableId).id;
      this.admin.order.getOrders('').subscribe(orders => {
        if (orders.filter(o => o.tableId === this.tableId).length > 0) {
          this.order = orders.filter(o => o.tableId === this.tableId && o.status !== 'PAID')[0];
        }
      });
    });
  }

  getStatus(status) {
    switch (status) {
      case 'NEW':
        return 'Đang chờ';
      case 'IN_PROGRESS':
        return 'Đang làm';
      case 'DONE':
        return 'Đã xong';
    }
  }
}
