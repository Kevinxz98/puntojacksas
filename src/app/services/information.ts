import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Information {
  private apiUrl = 'http://127.0.0.1:8000/api/information/show';

  private infoSubject = new BehaviorSubject<any>(null);
  info$ = this.infoSubject.asObservable();

  constructor(private http: HttpClient) { }

  private getHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      })
    };
  }

  loadInformation(): void {
    this.http.get<any>(this.apiUrl, this.getHeaders()).subscribe({
      next: (data) => this.infoSubject.next(data),
      error: (err) => console.error('Error cargando información', err)
    });
  }

  getInformation(): Observable<any> {
    return this.http.get<any>(this.apiUrl, this.getHeaders());
  } 

  updateInformation(data: any, files?: { [key: string]: File }): Observable<any> {
  const formData = new FormData();


  Object.keys(data).forEach(key => {
    if (data[key] !== null && data[key] !== undefined) {
      formData.append(key, data[key]);
    }
  });
  if (files) {
    Object.keys(files).forEach(field => {
      if (files[field]) {
        formData.append(field, files[field]);
      }
    });
  }
  formData.append('_method', 'PUT');
  for (let pair of formData.entries()) {
    console.log(pair[0]+ ': ' + pair[1]);
  }
  return this.http.post<any>(this.apiUrl, formData, this.getHeaders());
}

}
