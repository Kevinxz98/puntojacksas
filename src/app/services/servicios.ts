import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Servicios {
  private apiUrl = 'http://127.0.0.1:8000/api/servicios';
  private apiPublicUrl = 'http://127.0.0.1:8000/api/client-servicios';
  private apiSlug = 'http://127.0.0.1:8000/api/servicios/${slug}';

  private serviceSubject = new BehaviorSubject<any>(null);
  service$ = this.serviceSubject.asObservable();

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

  getServicios(): Observable<any> {
    return this.http.get<any>(this.apiUrl, this.getHeaders());
  }

  deleteServicio(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, this.getHeaders());
  }

  getServiciosPublic(): Observable<any> {
    return this.http.get<any>(this.apiPublicUrl);
  }

  getServicioBySlug(slug: string): Observable<any> {
    return this.http.get<any>(`${this.apiSlug}`.replace('${slug}', slug));
  }
  
}
