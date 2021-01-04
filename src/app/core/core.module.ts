import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleBarDirective } from './simple-bar.directive';
import { ImageCropperModule } from './image-cropper/image-cropper.module';
import { ConfirmationComponent } from './confirmation/confirmationComponent';

@NgModule({
  declarations: [
    SimpleBarDirective,
    ConfirmationComponent
  ],
  imports: [
    CommonModule,
    ImageCropperModule
  ],
  exports: [
    ImageCropperModule,
    SimpleBarDirective,
    ConfirmationComponent
  ]
})
export class CoreModule { }
