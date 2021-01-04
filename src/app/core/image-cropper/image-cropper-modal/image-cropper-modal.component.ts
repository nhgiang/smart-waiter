import Cropper from 'cropperjs';
import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { ImageCropperSetting, ImageCropperResult } from '../image-cropper-interfaces';
import { ModalDirective } from 'ngx-bootstrap/modal';


@Component({
  selector: 'image-cropper-modal',
  templateUrl: './image-cropper-modal.component.html',
  styleUrls: ['./image-cropper-modal.component.scss'],
})

export class ImageCropperModalComponent {
  @Input() allowCrop = true;
  @Input() modalTitle = 'Edit image';
  @Input() btnCancel = 'Cancel';
  @Input() btnOK = 'OK';
  @Input() btnOriginal = 'Take original image';
  @Input() imageUrl;
  @Input() loadImageErrorText: string;
  @Input() settings: ImageCropperSetting;
  @Output() ready = new EventEmitter();
  @Output() saved = new EventEmitter<ImageCropperResult>();
  @ViewChild('image', { static: true }) image;
  @ViewChild('modal', { static: true }) modal: ModalDirective;

  isLoading = true;
  loadError: any;

  private cropper: Cropper;
  private mimeType = 'image/png';

  open(imageUrl: any) {
    this.modal.show();
    this.loadImage(imageUrl);
  }

  hide() {
    this.modal.hide();
  }

  imageLoaded(ev: Event) {
    this.isLoading = true;
    this.loadError = false;

    const image = ev.target as HTMLImageElement;
    image.crossOrigin = 'anonymous';
    image.addEventListener('ready', async () => {
      const response = await fetch(image.src);
      const blob = await response.blob();
      this.mimeType = blob.type;
      this.ready.emit(true);
      window.dispatchEvent(new Event('resize'));
      const imageData = this.cropper.getImageData();
      this.cropper.setCropBoxData({
        left: 0,
        top: 0,
        width: imageData.width,
        height: imageData.height,
      });
      this.isLoading = false;
    });
    if (this.cropper) {
      this.cropper.destroy();
    }
    this.cropper = new Cropper(image, this.cropperOptions);
    if (!this.allowCrop) {
      window.setTimeout(() => {
        this.exportCanvas();
      }, 1000);
    }
  }

  imageLoadError(event) {
    this.loadError = true;
    this.isLoading = false;
  }

  loadImage(imageUrl: string) {
    this.isLoading = imageUrl !== this.imageUrl;
    window.setTimeout(() => {
      this.imageUrl = imageUrl;
      this.isLoading = false;

    }, 1000);
  }

  exportCanvas(base64?) {
    this.isLoading = true;
    const imageData = this.cropper.getImageData();
    const cropData = this.cropper.getCropBoxData();
    const canvas = this.cropper.getCroppedCanvas();
    const data = {
      imageData,
      cropData,
    };

    const promise = new Promise(resolve => {
      if (base64) {
        return resolve({
          dataUrl: canvas.toDataURL(this.mimeType),
        });
      }
      canvas.toBlob(blob => resolve({ blob }), this.mimeType);
    });
    promise.then(res => {
      this.isLoading = false;
      this.saved.emit(Object.assign(data, res));
      this.hide();
    }, err => {
      this.isLoading = false;
      console.error(err);
    });
  }

  private get cropperOptions(): any {
    let aspectRatio = NaN;
    if (this.settings) {
      const { width, height } = this.settings;
      aspectRatio = width / height;
    }
    const extra = this.settings ? this.settings.extra : {};
    return Object.assign({
      aspectRatio,
      movable: false,
      scalable: false,
      zoomable: false,
      viewMode: 2,
    }, extra);
  }

}
