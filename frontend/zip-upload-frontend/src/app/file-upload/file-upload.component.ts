import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from '../Services/api.service';
import { ResultDialogComponent } from '../result-dialog/result-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
})
export class FileUploadComponent {
  selectedEvaluationTypes: string[] = []; // Use an array to store multiple selected evaluation types
  fileToUpload: File | null = null;
  responseText: string = '';
  download: boolean = false;
  filename: string = '';
  downloadsh: boolean = false;
  loading = false;
  editmode = false;

  constructor(private http: HttpClient, private apiSerivce: ApiService, private dialog: MatDialog) {}

  onFileSelected(event: any): void {
    this.fileToUpload = event.target.files[0] as File;
    console.log(this.fileToUpload.name);
    this.filename = this.fileToUpload.name;

  }

  downloadFile(): void {
    this.apiSerivce.downloadZipFile(this.fileToUpload?.name).subscribe(
      (data: Blob) => {
        const blob = new Blob([data], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = `${this.fileToUpload?.name}`;
        anchor.click();
        this.download = false;
        this.downloadsh = false;
        // this.filename = false;
      },
      (error) => {
        console.error('Error downloading file:', error);
      }
    );
  }

  downloadSHFile(): void {
    console.log(this.selectedEvaluationTypes);
    for (let i = 0; i < this.selectedEvaluationTypes.length; i++) {
      if (this.selectedEvaluationTypes[i] == 'Karma') {
        this.apiSerivce.downloadZipFile(`karma.sh`, "karma").subscribe(
          (data: Blob) => {
            const blob = new Blob([data], { type: 'application/octet-stream' });
            const url = window.URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = `karma.sh`;
            anchor.click();
            this.download = true;
            this.downloadsh = false;
            // this.filename = false;
          },
          (error) => {
            console.error('Error downloading file:', error);
          }
        );
      }
      if (this.selectedEvaluationTypes[i] == 'NUnit') {
        this.apiSerivce.downloadZipFile(`run.sh`,'nunit').subscribe(
          (data: Blob) => {
            const blob = new Blob([data], { type: 'application/octet-stream' });
            const url = window.URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = `run.sh`;
            anchor.click();
            this.download = true;
            this.downloadsh = false;
            // this.filename = false;
          },
          (error) => {
            console.error('Error downloading file:', error);
          }
        );
      }
    }
    // this.apiSerivce.downloadZipFile(`run.sh`).subscribe(
    //   (data: Blob) => {
    //     const blob = new Blob([data], { type: 'application/octet-stream' });
    //     const url = window.URL.createObjectURL(blob);
    //     const anchor = document.createElement('a');
    //     anchor.href = url;
    //     anchor.download = `run.sh`;
    //     anchor.click();
    //     this.download = true;
    //     this.downloadsh = false;
    //     // this.filename = false;
    //   },
    //   (error) => {
    //     console.error('Error downloading file:', error);
    //   }
    // );
  }

  openResultDialog(response: any): void {
    const dialogRef = this.dialog.open(ResultDialogComponent, {
      width: '400px',
      data: { response,testcases: response[0].testcases },
      // data: { testcases: response },
      // panelClass: 'custom-dialog-container', // Add a custom class for styling
    });

    dialogRef.afterClosed().subscribe((result: { testcases: any[] }) => {
      if (result) {
        // Save the changes if needed
        console.log('Testcase edited:', result);
      }
    });
    dialogRef.componentInstance.dataEditedEvent.subscribe((editedData: any) => {
      console.log('Edited data:', editedData.response);
      this.responseText = JSON.stringify(editedData.response, null, 2);

      // Perform any additional actions with the edited data
      // For example, pass it to a JSON viewer
      // this.passDataToJSONViewer(editedData);
    });

  }

  onUpload(): void {
    this.loading = true; // Show loading indicator when request is made
    if (this.fileToUpload && this.selectedEvaluationTypes.length > 0) {
      const formData = new FormData();
      formData.append('zipFile', this.fileToUpload);
      formData.append('evaluationTypes', this.selectedEvaluationTypes.join(','));

      // Pass the selected evaluation types as a comma-separated string
      const evaluationTypes = this.selectedEvaluationTypes.join(',');

      // Set up headers to indicate form data
      const headers = new HttpHeaders();
      headers.set('enctype', 'multipart/form-data');
      console.log(formData);

      this.apiSerivce.uploadFile(formData).subscribe(
        (response) => {
          this.loading = false;
          console.log('Upload successful:', response);
          this.openResultDialog(response);

        this.download = true;
        this.downloadsh = true;
          this.responseText = JSON.stringify(response, null, 2);
          console.log(this.responseText);

        },
        (error) => {
          console.error('Upload failed:', error);
        this.download = false;
        this.downloadsh = false;

          this.responseText = 'Upload failed';
        }
      ).add(() => {
        this.loading = false; // Hide loading indicator when request completes
      });
    }
  }
}
