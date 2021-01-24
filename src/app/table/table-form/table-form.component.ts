import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AdminService } from 'src/app/api/admin.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-table-form',
  templateUrl: './table-form.component.html',
  styleUrls: ['./table-form.component.scss']
})
export class TableFormComponent implements OnInit {
  @Input() id: string;
  @Output() submited = new EventEmitter()
  form: FormGroup;
  constructor(
    private modalRef: BsModalRef,
    private fb: FormBuilder,
    private adminService: AdminService,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    if (this.id) {
      this.fetch();
    }
  }

  fetch() {
    this.adminService.table.getById(this.id).subscribe(res => {
      this.form.patchValue(res);
    });
  }

  hide() {
    this.modalRef.hide();
  }

  buildForm() {
    this.form = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      status: ['', Validators.required],
      totalSeats: ['', Validators.min(1)],
    });
  }

  submit() {
    Object.keys(this.form.controls).forEach(field => {
      const control = this.form.get(field);
      if (control instanceof AbstractControl) {
        control.markAsTouched();
      }
    });
    if (this.form.invalid) {
      return;
    }
    this.form.value.id = this.id ?? undefined;
    this.adminService.table.create(this.form.value).subscribe(response => {
      this.id ? this.alert.success('Cập nhật bàn thành công') : this.alert.success('Thêm mới bàn thành công');
      this.submited.emit();
      this.hide();
    });
  }
}
