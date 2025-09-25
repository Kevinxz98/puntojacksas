import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Servicios } from '../../services/servicios';
import { ActivatedRoute } from '@angular/router';
import { Header } from '../home/header/header';
import { HeaderTop } from '../home/header-top/header-top';
import { Footer } from '../home/footer/footer';
import { FormContact } from '../home/form-contact/form-contact';

@Component({
  selector: 'app-servicio-detalle',
  standalone: true,
  imports: [CommonModule, Header, HeaderTop, Footer,FormContact],
  templateUrl: './servicio-detalle.html',
  styleUrl: './servicio-detalle.css'
})
export class ServicioDetalle implements OnInit {
  servicio: any;

  constructor(private serviciosService: Servicios, private route: ActivatedRoute) {}

  ngOnInit(): void {

    
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.serviciosService.getServicioBySlug(slug).subscribe({
        next: (data) => {
          this.servicio = data;
        },
        error: (err) => {
          console.error('Error al cargar el servicio', err);
        }
      });
    }
  }
}
