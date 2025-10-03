import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Servicios } from '../../services/servicios';
import { ActivatedRoute, Route } from '@angular/router';
import { Header } from '../home/header/header';
import { HeaderTop } from '../home/header-top/header-top';
import { Footer } from '../home/footer/footer';
import { FormContact } from '../home/form-contact/form-contact';
import { RouterLink } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { Information } from '../../services/information';
import { Subscription } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Component({
  selector: 'app-servicio-detalle',
  standalone: true,
  imports: [CommonModule, Header, HeaderTop, Footer, FormContact, RouterLink],
  templateUrl: './servicio-detalle.html',
  styleUrl: './servicio-detalle.css',
})
export class ServicioDetalle implements OnInit {
  servicio: any;
  nServicios: any[] = [];
  backUrl = environment.apiStorageUrl ;
  slugActual: string = '';
  private routeSub!: Subscription;

  constructor(
    public infoService: Information,
    private serviciosService: Servicios,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.routeSub = this.route.params.subscribe(params => {
      const slug = params['slug'];
      this.loadServicio(slug);
    });

    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.serviciosService.getServicioBySlug(slug).subscribe({
        next: (data) => {
          this.servicio = data.data || data;
          this.loadServicio(slug);
        },
        error: (err) => {
          console.error('Error al cargar el servicio', err);
        },
      });
    }

    this.loadServicios();
    this.cdr.detectChanges();
    this.slugActual = this.route.snapshot.paramMap.get('slug') ?? '';

    
  }

  loadServicio(slug: string): void {
    this.servicio = null; // Resetear antes de cargar nuevo
    
    this.serviciosService.getServicioBySlug(slug).subscribe({
      next: (data) => {
        if (data.data) {
          this.servicio = data.data;
        } else if (Array.isArray(data)) {
          this.servicio = data[0];
        } else {
          this.servicio = data;
        }
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar el servicio', err);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  loadServicios(): void {
    this.serviciosService.getServiciosPublic().subscribe({
      next: (data) => {
        this.nServicios = Array.isArray(data) ? data : data.data ?? [];
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar servicios', err);
      },
    });
  }
}
