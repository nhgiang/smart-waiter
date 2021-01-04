import { Component, forwardRef, Input, ViewChild, OnDestroy, Output, EventEmitter, OnChanges, ElementRef } from '@angular/core';
import { DomSanitizer, } from '@angular/platform-browser';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { ImageCropperModalComponent } from '../image-cropper-modal/image-cropper-modal.component';
import { ImageCropperSetting } from '../image-cropper-interfaces';
import { v4 } from 'uuid';

@Component({
  selector: 'image-cropper-control',
  templateUrl: './image-cropper-control.component.html',
  styleUrls: ['./image-cropper-control.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ImageCropperControlComponent),
    multi: true,
  }],
})

export class ImageCropperControlComponent implements OnDestroy, OnChanges {
  @Input() btnUploadText = 'Choose file';
  @Input() btnRemoveText = 'Remove';
  @Input() fullWidth: boolean;
  @Input() hidePlaceholder = false;
  @Input() textNoImage = 'No image selected';

  @Input() allowCrop = true;
  @Input() disabled = false;
  @Input() accept = 'image/*';
  @Input() imageData: any;
  @Input() imageUrl: string;
  @Input() maximumFileSize: number;
  @Input() minHeight = 150;
  @Input() modalInside = true;
  @Input() settings: ImageCropperSetting;
  @Output() changed = new EventEmitter();
  @Output() openImageModal = new EventEmitter();
  @Output() ready = new EventEmitter();
  @Output() removed = new EventEmitter();
  @Output() saved = new EventEmitter();
  @Output() oversized = new EventEmitter();
  @ViewChild('cropperModal', { static: true }) public cropperModal: ImageCropperModalComponent;
  @ViewChild('preview') preview: ElementRef;

  isUploading = false;

  controlId = v4();
  image: any;
  displayedUrl: string;

  private onChange: Function;

  constructor(private sanitizer: DomSanitizer) { }

  writeValue(imageUrl?: any) {
    this.image = imageUrl;
    this.displayedUrl = imageUrl instanceof Blob
      ? this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(imageUrl))
      : imageUrl;
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
  }

  open(input: HTMLInputElement) {
    const inputFile = input.files[0];
    input.value = '';
    const fileSize = inputFile.size / 1024 / 1024; // in MB
    if (fileSize > this.maximumFileSize) {
      this.oversized.emit(this.maximumFileSize);
      return;
    }
    if (!inputFile) {
      return;
    }


    this.changed.emit(inputFile);
    if (!/^image\//.test(inputFile.type)) {
      console.error('Non image file is not allowed to be uploaded');
      return;
    }


    this.image = {} as any;
    this.image.name = inputFile.name;
    const imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(inputFile));
    if (!this.allowCrop) {
      this.isUploading = true;
    }
    if (this.modalInside) {
      this.cropperModal.open(imageUrl);
    } else {
      this.openImageModal.emit(imageUrl);
    }
  }

  ngOnDestroy() {
    URL.revokeObjectURL(this.displayedUrl);
  }

  ngOnChanges() {
    if (this.imageData) {
      this.saveData(this.imageData);
    }
  }

  remove(ev: Event) {
    ev.stopPropagation();
    ev.preventDefault();
    this.image = undefined;
    this.displayedUrl = undefined;
    this.imageUrl = undefined;
    URL.revokeObjectURL(this.displayedUrl);
    this.onChange(undefined);
    this.removed.emit();
  }

  get isEmpty(): boolean {
    return !this.displayedUrl && !this.imageUrl;
  }

  saveData(data) {
    if (!data) {
      return;
    }
    if (this.maximumFileSize && data.blob.size > this.maximumFileSize * Math.pow(1024, 2)) {
      this.oversized.emit(this.maximumFileSize);
      return;
    }
    this.updateValue(data);
    URL.revokeObjectURL(this.displayedUrl);
    this.saved.emit(this.image);
    this.isUploading = false;
  }

  private updateValue(result: any) {
    if (!result) {
      return;
    }
    this.transform(result);
    if (this.onChange) {
      this.onChange(this.image);
    }
  }

  private transform(result: any): any {
    if (this.displayedUrl) {
      URL.revokeObjectURL(this.displayedUrl);
    }
    this.displayedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(result.blob)) as string;
    this.imageUrl = result.blob;
    this.image = result.blob;
  }

}
