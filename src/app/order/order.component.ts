import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AdminService } from '../api/admin.service';
import { AlertService } from '../services/alert.service';
import { OrderFormComponent } from './order-form/order-form.component';
import { } from 'lodash'
import { SocketioService } from '../services/socketio.service';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  keyword: string;
  items = [];
  page = 1;
  perPage = 10;
  status = '';
  constructor(
    private adminService: AdminService,
    private modalService: BsModalService,
    private alert: AlertService,
    private socketService: SocketioService
  ) { }

  ngOnInit(): void {
    this.fetch().subscribe(res => {
      this.items = res;
    });
    this.socketService.msg.subscribe(items => {
      if (items.type === 'create') {
        this.items.push(items);
      } else {
        this.items.map((item, i) => {
          if (item.id === items.id) {
            this.items[i] = items
          }
        })
      }
    });
  }

  fetch() {
    return this.adminService.order.getOrders('');
  }

  search() {
    return this.adminService.order.getOrders(this.keyword).subscribe(res => {
      this.items = res;
    });
  }

  addItem() {
    const ref = this.modalService.show(OrderFormComponent);
    ref.content.submited.subscribe(() => {
      this.fetch().subscribe(res => {
        this.items = res;
        ref.hide()
      });
    });
  }

  deleteItem(id) {
    this.adminService.item.delete(id).subscribe(() => {
      this.alert.success('Xóa sản phẩm thành công')
      this.fetch().subscribe(res => {
        this.items = res;
      });
    });
  }

  editItem(id, createdDate) {
    const initialState = { id, createdDate };
    const ref = this.modalService.show(OrderFormComponent, {
      initialState,
      backdrop: 'static'
    })
    ref.content.submited.subscribe(() => {
      this.fetch().subscribe(res => {
        this.items = res;
      });
    });
  }
  viewDetail(id, createdDate) {
    const initialState = { id, createdDate };
    const ref = this.modalService.show(OrderFormComponent, {
      initialState,
      backdrop: 'static',
      class: 'modal-lg'
    })
  }

  pay() {
    this.socketService.createBill({});
  }
}
