import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AdminService } from 'src/app/api/admin.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit {
  @Input() id: string;
  @Input() createdDate: any;
  @Output() submited = new EventEmitter();
  item: any;
  constructor(
    private adminService: AdminService,
    private modalRef: BsModalRef
  ) { }

  ngOnInit(): void {
    this.fetch();
  }

  fetch() {
    this.adminService.order.getOrder(this.id).subscribe(res => {
      this.item = res;
    });
  }

  closeModal() {
    this.modalRef.hide();
  }
}
