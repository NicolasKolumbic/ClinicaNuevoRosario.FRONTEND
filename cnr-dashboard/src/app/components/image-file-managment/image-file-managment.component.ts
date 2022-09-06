import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'cnr-image-file-managment',
  templateUrl: './image-file-managment.component.html',
  styleUrls: ['./image-file-managment.component.scss']
})
export class ImageFileManagmentComponent implements OnInit {

  public files: File[] = [];
  public photo?: SafeResourceUrl;

  constructor(private _sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  selectFile(event: any) {
    const reader = new FileReader();

    reader.onloadend = () => {
      this.photo = this._sanitizer.bypassSecurityTrustResourceUrl(reader.result!.toString());    
    }

    reader.readAsDataURL(event.files[0]);
  }



}
