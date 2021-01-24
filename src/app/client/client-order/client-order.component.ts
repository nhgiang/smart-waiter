import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/api/admin.service';
import { sum } from 'lodash';
import { SocketioService } from 'src/app/services/socketio.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { storageUtils } from 'utils/storage';

@Component({
  selector: 'app-client-order',
  templateUrl: './client-order.component.html',
  styleUrls: ['./client-order.component.scss']
})
export class ClientOrderComponent implements OnInit {
  itemActive = 1;
  foods: any[];
  itemOrders = [];
  totalPrice = 0;
  helper = new JwtHelperService();
  drinks: any[];
  token: any;
  orderId: string;
  tableId;
  constructor(
    private admin: AdminService,
    private socketService: SocketioService
  ) { }

  ngOnInit(): void {
    this.token = this.helper.decodeToken(storageUtils.get('token'));
    this.fetch();
    this.socketService.msg.subscribe(data => {
      this.orderId = data;
    });
  }

  fetch() {
    this.admin.item.getItems('').subscribe(item => {
      this.foods = item.filter(t => t.type === 'FOOD');
      this.drinks = item.filter(t => t.type === 'DRINK');
    });
    this.admin.table.getTables('').subscribe(tables => {
      this.tableId = tables.find(t => this.token.jti === t.loginTableId).id;
      this.fecthOrder();
    })
  }

  fecthOrder() {
    this.admin.order.getOrders('').subscribe(orders => {
      if (orders.filter(o => o.tableId === this.tableId).length > 0) {
        this.orderId = orders.filter(o => o.tableId === this.tableId)[0].id;
      }
    });
  }

  addItem(item) {
    if (this.itemOrders.filter(i => i.id === item.id).length === 0) {
      item.number = 1;
      this.itemOrders.push(item);
    } else {
      const a = this.itemOrders.find(i => i.id === item.id);
      a.number += 1;
    }
    this.totalPrice = sum(this.itemOrders.map(i => {
      return i.price * i.number;
    }));
  }

  minus(id) {
    const item = this.itemOrders.find(i => i.id === id);
    item.number -= 1;
    if (item.number === 0) {
      this.itemOrders.splice(this.itemOrders.findIndex(i => i.id === id), 1);
    }
    this.totalPrice = sum(this.itemOrders.map(i => {
      return i.price * i.number;
    }));
  }

  plus(id) {
    this.itemOrders.find(i => i.id === id).number += 1;
    this.totalPrice = sum(this.itemOrders.map(i => {
      return i.price * i.number;
    }));
  }

  remove(id) {
    this.itemOrders.splice(this.itemOrders.findIndex(i => i.id === id), 1);
    this.totalPrice = sum(this.itemOrders.map(i => {
      return i.price * i.number;
    }));
  }

  order() {
    const orderItemList = this.itemOrders.map(t => {
      return {
        discount: 0,
        itemId: t.id,
        price: t.price,
        quantity: t.number,
        status: 'NEW',
        note: t.note ?? '',
      };
    });

    if (this.orderId) {
      const data = {
        orderItem: orderItemList[0],
        orderId: this.orderId
      };
      this.socketService.update(data)
    } else {
      const data = {
        orderItemList,
        tableId: this.tableId
      };
      this.socketService.sendMessage(data);
    }
    this.itemOrders = [];
  }

  payment() {
    // const data = {
    //   orderId: this.orderId,
    //   orderStatus: 'PAYMENT'
    // };
    // this.socketService.updateStatusOrder(data);
    const billData = {
      tableId: this.token.jti,
      orderIds: [
        this.orderId
      ]
    }
    this.socketService.createBill(billData)
  }

  note(id, e) {
    this.itemOrders.map((item, i) => {
      if (item.id === id) {
        item.note = e.target.value;
      }
    });
  }
}
