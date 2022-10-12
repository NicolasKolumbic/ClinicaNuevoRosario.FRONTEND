import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ImageCroppedEvent, ImageCropperComponent, LoadedImage } from 'ngx-image-cropper';


@Component({
  selector: 'cnr-image-file-managment',
  templateUrl: './image-file-managment.component.html',
  styleUrls: ['./image-file-managment.component.scss']
})
export class ImageFileManagmentComponent {

  public imageChangedEvent: any = '';
  public croppedImage: any = '';

  @Output() onSendPicture: EventEmitter<string> = new EventEmitter();

  @ViewChild(ImageCropperComponent) imageCropper!: ImageCropperComponent;

  get hasPhoto() {
    return this.imageChangedEvent !== '';
  }

    fileChangeEvent(event: Event): void {
        this.imageChangedEvent = event;
    }

    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64;
        this.onSendPicture.emit(this.croppedImage);
    }

    imageLoaded(image: LoadedImage) {
      console.log(arguments);
    }

    loadImageFailed() {
        console.log(arguments);
    }

    cutPhoto() {
      this.imageCropper.crop();
    }
}
