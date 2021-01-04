import { Component, EventEmitter, Input, NgZone, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AdminService } from 'src/app/api/admin.service';
import { UploadService } from 'src/app/api/upload.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-form-category',
  templateUrl: './form-category.component.html',
  styleUrls: ['./form-category.component.scss']
})
export class FormCategoryComponent implements OnInit {
  @Input() id: string;
  @Output() submited = new EventEmitter();
  form: FormGroup;
  uploader: FileUploader;
  uploaderOptions: FileUploaderOptions;
  res: any;
  loading: boolean;
  constructor(
    private modalRef: BsModalRef,
    private fb: FormBuilder,
    private adminService: AdminService,
    private uploadService: UploadService,
    private alert: AlertService,
    private cloudinary: Cloudinary,
    private zone: NgZone,
  ) { }

  ngOnInit(): void {
    this.buildForm();
    if (this.id) {
      this.fetch();
    }
    this.uploaderOptions = {
      url: `https://api.cloudinary.com/v1_1/${this.cloudinary.config().cloud_name}/upload`,
      autoUpload: true,
      isHTML5: true,
      // Calculate progress independently for each uploaded file
      removeAfterUpload: true,
      // XHR request headers
      headers: [
        {
          name: 'X-Requested-With',
          value: 'XMLHttpRequest'
        }
      ]
    };
    this.uploader = new FileUploader(this.uploaderOptions);
    this.uploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
      form.append('upload_preset', this.cloudinary.config().upload_preset);
      form.append('folder', 'angular_sample');
      form.append('file', fileItem);

      // Use default "withCredentials" value for CORS requests
      fileItem.withCredentials = false;
      this.loading = false;
      return { fileItem, form };
    };
    this.uploader.onCompleteItem = (item: any, response: string, status: number, headers: ParsedResponseHeaders) => {
      // console.log(response)
      this.res = JSON.parse(response);
      this.loading = true;
    }
  }

  fetch() {
    this.adminService.item.getById(this.id).subscribe(res => {
      this.form.patchValue({
        id: res.id,
        name: res.name,
        price: res.price,
        type: res.type,
        status: res.status,
        image: res.imageUrl
      });
    });
  }

  hide() {
    this.modalRef.hide();
  }

  buildForm() {
    this.form = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(1)]],
      type: ['', Validators.required],
      status: ['', Validators.required],
      imageUrl: ['']
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
    const command = this.form.value;
    command.imageUrl = this.res.url;
    this.adminService.item.create(command).subscribe(data => {
      this.id ? this.alert.success('Cập nhật sản phẩm thành công') : this.alert.success('Thêm mới sản phẩm thành công');
      this.submited.emit();
    });
  
    /* Getting the Error message Cloudinary throws. */
    // const formData = new FormData();
    // formData.append('file', this.form.value.image);
    // formData.append('upload_preset', 'sem4_cloundinary');
    // formData.append('cloud_name', 'giang2000');
    // const data = {
    //   category: 'file'
    // };
    // this.uploadService.upload(formData).pipe(
    //   switchMap(fileUrl => {
    //     const command = this.form.value;
    //     command.imageUrl = fileUrl;
    //     return this.adminService.item.create(command);
    //   })).subscribe(response => {
    //     this.id ? this.alert.success('Cập nhật sản phẩm thành công') : this.alert.success('Thêm mới sản phẩm thành công');
    //     this.hide();
    //     this.submited.emit();
    //   });
  }

}
