import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AdminService } from '../api/admin.service';
import { AlertService } from '../services/alert.service';
import { FormCategoryComponent } from './form-category/form-category.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  keyword: string;
  items: any[];
  type = null;
  page = 1;
  perPage = 10;
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
    return this.adminService.item.getItems('');
  }

  search() {
    return this.adminService.item.getItems(this.keyword).subscribe(res => {
      this.items = res;
    });
  }

  addItem() {
    const ref = this.modalService.show(FormCategoryComponent);
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

  editItem(id) {
    const initialState = {id};
    const ref = this.modalService.show(FormCategoryComponent, {
      initialState,
      backdrop: 'static'
    })
    ref.content.submited.subscribe(() => {
      this.fetch().subscribe(res => {
        this.items = res;
      });
    });
  }

  searchByType(e) {
    this.type = e.target.value;
  }
}
