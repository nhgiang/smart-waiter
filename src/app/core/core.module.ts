import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleBarDirective } from './simple-bar.directive';
import { ImageCropperModule } from './image-cropper/image-cropper.module';
import { ConfirmationComponent } from './confirmation/confirmationComponent';
import { FilterPipe } from './filter.pipe';

@NgModule({
  declarations: [
    SimpleBarDirective,
    ConfirmationComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    ImageCropperModule
  ],
  exports: [
    ImageCropperModule,
    SimpleBarDirective,
    ConfirmationComponent,
    FilterPipe
  ]
})
export class CoreModule { }
