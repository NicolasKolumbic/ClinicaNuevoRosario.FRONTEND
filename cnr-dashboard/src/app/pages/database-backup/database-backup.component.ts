import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { AdministatorServiceService } from 'src/app/services/administator-service.service';

@Component({
  selector: 'cnr-database-backup',
  templateUrl: './database-backup.component.html',
  styleUrls: ['./database-backup.component.scss']
})
export class DatabaseBackupComponent implements OnInit {

  backupDataForm: FormGroup;
  today: string = moment().format('DDMMyyyyHHmmss');

  @ViewChild('link', {static: false}) link!: ElementRef<HTMLAnchorElement>; 

  constructor(
    private formBuilder: FormBuilder,
    private administatorServiceService: AdministatorServiceService
  ) {
      this.backupDataForm = this.formBuilder.group({
        fileName: ['', [Validators.required]]
      })
  }

  ngOnInit(): void {
  }

  get fileName() {
    return this.backupDataForm.get('fileName') && this.backupDataForm.get('fileName')?.value;
  }

  generateBackupFile() {
    const {fileName} = this.backupDataForm.value;
    const file = `${fileName}_${this.today}.bak`;

    this.administatorServiceService.generateBackupDatabase(file).subscribe((response: Blob) => {
      const blob = new Blob([response], { type: 'application/octet-stream' });
      const url = window.URL.createObjectURL(blob);
      this.link.nativeElement.href = url;
      this.link.nativeElement.download = file;
      this.link.nativeElement.click();

      window.URL.revokeObjectURL(url);
    });
  }

}
