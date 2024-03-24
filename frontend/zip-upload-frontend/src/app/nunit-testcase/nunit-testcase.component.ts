import { Component } from '@angular/core';
import { ApiService } from '../Services/api.service';

@Component({
  selector: 'app-nunit-testcase',
  templateUrl: './nunit-testcase.component.html',
  styleUrls: ['./nunit-testcase.component.css']
})
export class NunitTestcaseComponent {
  selectedFile: File | null = null;
  selectedFileName: string | null = null;
  writeTestCasesOnHttptest: boolean = false;
  download: boolean = false;
  filename: boolean = false;
  constructor(private fileService: ApiService) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] as File;
    console.log(this.selectedFile.name);
    if (this.selectedFile.name != null) {
      this.filename=true;
      this.selectedFileName = this.selectedFile.name;
    } else {
      this.filename = false;
      this.selectedFileName = 'No file selected';
    }

  }

  uploadFile(): void {
    console.log("check"+this.writeTestCasesOnHttptest);

    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.fileService.uploadTestFile(this.selectedFile, this.writeTestCasesOnHttptest).subscribe(
        () => {
          console.log('File uploaded successfully');
          this.download = true;
        },
        (error) => {
          console.error('Error uploading file:', error);
          this.download = false;
        }
      );
    }
  }

  downloadFile(): void {
    this.fileService.downloadUnitTestFile().subscribe(
      (data: Blob) => {
        const blob = new Blob([data], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = 'UnitTest1.cs';
        anchor.click();
        this.download = false;
        this.filename = false;
      },
      (error) => {
        console.error('Error downloading file:', error);
      }
    );
  }
}
