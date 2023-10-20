import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  uploadFile(file: File, selectedTypes: string[]): Observable<any> {
    // Implement the file upload logic here and send the selected types to the server.
    // Return the JSON response from the server.
    return this.http.post<any>('/api/upload', { file, selectedTypes });
  }
}
