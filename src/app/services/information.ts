import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Information {
  private apiUrl = 'http://127.0.0.1:8000/api/information/show';

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

  getInformation(): Observable<any> {
    return this.http.get<any>(this.apiUrl, this.getHeaders());
  } 

  updateInformation(data: any, files?: { [key: string]: File }): Observable<any> {
  const formData = new FormData();

  // Tus campos normales
  Object.keys(data).forEach(key => {
    if (data[key] !== null && data[key] !== undefined) {
      formData.append(key, data[key]);
    }
  });

  // Archivos opcionales
  if (files) {
    Object.keys(files).forEach(field => {
      if (files[field]) {
        formData.append(field, files[field]);
      }
    });
  }

  // Hack para Laravel: decirle que es un PUT
  formData.append('_method', 'PUT');

  // Debug: ver lo que envías
  for (let pair of formData.entries()) {
    console.log(pair[0]+ ': ' + pair[1]);
  }

  // Ojo: usamos POST acá
  return this.http.post<any>(this.apiUrl, formData, this.getHeaders());
}

}
