import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = "http://localhost:3000"
  constructor(private http: HttpClient) {}

  uploadFile(file: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/process-zip`,  file );
  }

  uploadTestFile(file: File, httptest: boolean): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    if (httptest)
      return this.http.post(`${this.baseUrl}/httptest`, formData, { responseType: 'text' });
    else
      return this.http.post(`${this.baseUrl}/model`, formData, { responseType: 'text' });
  }

  downloadUnitTestFile(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/downloadtest`, { responseType: 'blob' });
  }

  downloadZipFile(zip: any, type?: any): Observable<Blob> {
    console.log(zip);
    if (type === undefined) {
      return this.http.get(`${this.baseUrl}/downloadziporsh?fileName=${zip}`, { responseType: 'blob' });
    }
    return this.http.get(`${this.baseUrl}/downloadziporsh?fileName=${zip}&type=${type}`, { responseType: 'blob' });
  }
}
