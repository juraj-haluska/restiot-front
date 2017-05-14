import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

declare var saveAs: any;

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {

  private files: String[] = [];

  constructor(
    private api: ApiService
  ) {}

  ngOnInit() {
    this.api.getFiles().then(files => {
      this.files = files;
    })
  }

  onDownload(file: String) {
   this.api.getFileBlob(file).then(blob => {
     saveAs(blob, file);
   });
  }

}
