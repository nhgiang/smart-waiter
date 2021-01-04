import Cropper from 'cropperjs'

export interface ImageCropperSetting {
  width: number
  height: number
  extra: any
}

export interface ImageCropperResult {
  imageData: Cropper.ImageData
  cropData: Cropper.CropBoxData
  blob?: Blob
  dataUrl?: string
}
