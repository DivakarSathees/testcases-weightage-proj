// import { Component } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';

// @Component({
//   selector: 'app-file-upload',
//   templateUrl: './file-upload.component.html',
//   styleUrls: ['./file-upload.component.css'],
// })
// export class FileUploadComponent {
//   selectedEvaluationType: string = 'karma';
//   fileToUpload: File | null = null;
//   responseText: string = ''; // Variable to store the response


//   constructor(private http: HttpClient) {}

//   onFileSelected(event: any): void {
//     this.fileToUpload = event.target.files[0] as File;
//   }

//   onUpload(): void {
//     if (this.fileToUpload) {
//       const formData = new FormData();
//       formData.append('zipFile', this.fileToUpload);
//       formData.append('evaluationTypes', this.selectedEvaluationType);

//       // Pass the selected evaluation type as a comma-separated string
//       const evaluationTypes = this.selectedEvaluationType;

//       // Set up headers to indicate form data
//       const headers = new HttpHeaders();
//       headers.set('enctype', 'multipart/form-data');

//       this.http
//         .post<any[]>('http://localhost:3000/process-zip', formData,
//         // {
//         //   headers,
//         //   params: { evaluationTypes },
//         // }
//         )
//         .subscribe(
//           (response) => {
//             console.log('Upload successful:', response);
//             this.responseText = JSON.stringify(response, null, 2); // Store the response
//           },
//           (error) => {
//             console.error('Upload failed:', error);
//             this.responseText = 'Upload failed'; // Set an error message
//           }
//         );
//     }
//   }

// }


import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
})
export class FileUploadComponent {
  selectedEvaluationTypes: string[] = []; // Use an array to store multiple selected evaluation types
  fileToUpload: File | null = null;
  responseText: string = '';

  constructor(private http: HttpClient) {}

  onFileSelected(event: any): void {
    this.fileToUpload = event.target.files[0] as File;
  }

  onUpload(): void {
    if (this.fileToUpload && this.selectedEvaluationTypes.length > 0) {
      const formData = new FormData();
      formData.append('zipFile', this.fileToUpload);
      formData.append('evaluationTypes', this.selectedEvaluationTypes.join(','));

      // Pass the selected evaluation types as a comma-separated string
      const evaluationTypes = this.selectedEvaluationTypes.join(',');

      // Set up headers to indicate form data
      const headers = new HttpHeaders();
      headers.set('enctype', 'multipart/form-data');

      this.http
        .post<any>('http://localhost:3000/process-zip', formData,
        // {
        //   headers,
        //   params: { evaluationTypes },
        // }
        )
        .subscribe(
          (response) => {
            console.log('Upload successful:', response);
            this.responseText = JSON.stringify(response, null, 2);
          },
          (error) => {
            console.error('Upload failed:', error);
            this.responseText = 'Upload failed';
          }
        );
    }
  }
}
