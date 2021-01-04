import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AdminService } from '../api/admin.service';
import { AlertService } from '../services/alert.service';
import { TableFormComponent } from './table-form/table-form.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  keyword: string;
  items: any[]
  constructor(
    private adminService: AdminService,
    private modalService: BsModalService,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.fetch().subscribe(res => {
      this.items = res;
    });
  }

  fetch() {
    return this.adminService.table.getTables('');
  }

  search() {
    return this.adminService.item.getItems(this.keyword).subscribe(res => {
      this.items = res;
    });
  }

  addItem() {
    const ref = this.modalService.show(TableFormComponent);
    ref.content.submited.subscribe(() => {
      this.fetch();
    });
  }

  deleteItem(id) {
    this.adminService.table.delete(id).subscribe()
    this.alert.success('Xóa bàn thành công')
    this.fetch();
  }

  editItem(id) {
    const initialState = { id };
    const ref = this.modalService.show(TableFormComponent, {
      initialState,
      backdrop: 'static',

    });
    ref.content.submited.subscribe(() => {
      this.fetch();
    });
  }

}
