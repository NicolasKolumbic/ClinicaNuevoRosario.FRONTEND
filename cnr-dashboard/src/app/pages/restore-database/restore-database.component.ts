import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdministatorServiceService } from 'src/app/services/administator-service.service';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'cnr-restore-database',
  templateUrl: './restore-database.component.html',
  styleUrls: ['./restore-database.component.scss']
})
export class RestoreDatabaseComponent implements OnInit {

  restoreDataForm!: FormGroup;
  uploadedFiles: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private administatorServiceService: AdministatorServiceService
  ) {
      this.restoreDataForm = this.formBuilder.group({
        file: ['', [Validators.required]]
      })
  }

  ngOnInit(): void {
  }

  restoreDatabase() {

  }

  onUpload(uploadEvent: UploadEvent) {

  }

}
