import { Component, OnInit } from '@angular/core';
import { Information } from '../../../services/information';
import { CommonModule } from '@angular/common';
import { Servicios } from '../../../services/servicios';
import { ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';
import { environment } from '../../../../environments/environment.prod';


@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class Services implements OnInit {
  servicios: any[] = [];

  constructor(
    public infoService: Information,
    private serviciosService: Servicios,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadServicios();
    this.cdr.detectChanges();
  }

    loadServicios(): void {
    this.serviciosService.getServiciosPublic().subscribe({
      next: (data) => {
        this.servicios = Array.isArray(data) ? data : data.data ?? [];
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar servicios', err);
      },
    });
  }

  slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD') // quita tildes
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-') // espacios por guiones
    .replace(/[^\w\-]+/g, '') // elimina caracteres raros
    .replace(/\-\-+/g, '-') // quita guiones dobles
    .trim();
}
}
