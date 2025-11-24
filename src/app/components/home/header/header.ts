import { Component,Inject , HostListener, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription, filter } from 'rxjs';
import { Servicios } from '../../../services/servicios';
import { Information } from '../../../services/information';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit, OnDestroy {
  private routerSub!: Subscription;
  servicios: any[] = [];
  isSticked = false;
  isDropdownOpen = false;
  currentUrl: string = '';


  constructor(
    private serviciosService: Servicios,
    private cdr: ChangeDetectorRef,
    private router: Router,
    public infoService: Information
  ) {}

  ngOnInit(): void {
    this.setupRouterSubscription();
    this.initialLoad();
  }

  ngOnDestroy(): void {
    // Limpiar suscripción para evitar memory leaks
    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }
  }

  private setupRouterSubscription(): void {
    this.routerSub = this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        this.currentUrl = event.urlAfterRedirects || event.url;
        console.log('Ruta cambió:', this.currentUrl);
        
        // Cerrar dropdown cuando cambia la ruta
        this.closeDropdown();
        
        this.refreshHeader();
      });
  }

  private initialLoad(): void {
    this.loadServicios();
    this.setInitialStickyState();
  }

  private refreshHeader(): void {
    this.setInitialStickyState();
    this.reloadDataIfNeeded();
    this.cdr.detectChanges();
  }

  private setInitialStickyState(): void {
    
  }

  private reloadDataIfNeeded(): void {
    const shouldReload = this.shouldReloadServices();
    if (shouldReload) {
      this.loadServicios();
    }
  }

  // Métodos del dropdown
  openDropdown(): void {
    this.isDropdownOpen = true;
    this.cdr.detectChanges(); // Forzar detección de cambios
  }

  closeDropdown(): void {
    this.isDropdownOpen = false;
    this.cdr.detectChanges(); // Forzar detección de cambios
  }

  toggleDropdown(event?: Event): void {
    if (event) {
      event.preventDefault(); // Prevenir comportamiento por defecto
    }
    this.isDropdownOpen = !this.isDropdownOpen;
    this.cdr.detectChanges();
  }


  @HostListener('window:click', ['$event'])
  onWindowClick(event: Event): void {
    // Cerrar dropdown si se hace click fuera de él
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown')) {
      this.closeDropdown();
    }
  }

  @HostListener('window:resize', [])
  onWindowResize(): void {
    // Cerrar dropdown en dispositivos móviles al redimensionar
    if (window.innerWidth <= 1023) {
      this.closeDropdown();
    }

  }

  // Cargar servicios
  loadServicios(): void {
    this.serviciosService.getServiciosPublic().subscribe({
      next: (data) => {
        this.servicios = Array.isArray(data) ? data : data.data ?? [];
        
        // Guardar timestamp de última carga
        localStorage.setItem('serviciosLastLoad', new Date().getTime().toString());
        
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar servicios', err);
      },
    });
  }

  // Slugify function
  slugify(text: string): string {
    if (!text) return '';
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .trim();
  }

  // Navegación mejorada
  navigateToServicio(servicio: any): void {
    const slug = this.slugify(servicio.slug);
    this.closeDropdown(); // Cerrar dropdown al navegar
    this.router.navigate(['/', slug]);
  }

  // Verificar si necesita recargar servicios
  private shouldReloadServices(): boolean {
    const lastLoad = localStorage.getItem('serviciosLastLoad');
    const now = new Date().getTime();
    
    if (!lastLoad) return true;
    
    const fiveMinutes = 5 * 60 * 1000;
    return (now - parseInt(lastLoad)) > fiveMinutes;
  }

  // Método para forzar refresh manual si es necesario
  forceRefresh(): void {
    this.loadServicios();
    this.closeDropdown();
    this.cdr.detectChanges();
  }

  async reportWhatsAppConversion() {
      const info = await firstValueFrom(this.infoService.viewInfo$);
      const whatsapp = info?.whatsapp;
  
      const url = `https://wa.me/57${whatsapp}?text=Hola%2C%20quiero%20más%20información`;
  
      // @ts-ignore
      gtag_report_conversion_llamada(url);
    }
}