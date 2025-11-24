import { Component, AfterViewInit, OnInit, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ViewEncapsulation } from '@angular/core';
import { Information } from '../../services/information';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule
  ],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
  encapsulation: ViewEncapsulation.None,
})
export class MainLayout implements AfterViewInit, OnInit {


  infoData: any = null;
  chatVisible = false;
  autoOpened = false;


  constructor(public infoService: Information, private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }

  ngOnInit(): void {
    this.infoService.loadViewInfo();

    // Detectar tipo de dispositivo
    const isMobile = window.innerWidth <= 768;

    if (!isMobile) {
      // En PC abrir automáticamente
      this.chatVisible = true;
      this.autoOpened = true;
    }
  }

  toggleChat() {
    this.chatVisible = !this.chatVisible;
    if (!this.chatVisible) {
      this.autoOpened = true;
    }
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    const isMobile = window.innerWidth <= 768;

    // Solo abrir automáticamente si aún no se ha auto-abierto
    if (isMobile && !this.chatVisible && !this.autoOpened) {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const scrollPosition = scrollTop + winHeight;

      // Si llega a la mitad de la página
      if (scrollPosition >= docHeight / 3) {
        this.chatVisible = true;
        this.autoOpened = true; // Marcar como abierto automáticamente
      }
    }
  }

  ngAfterViewInit() {
    const script = document.createElement('script');
    script.src = 'assets/js/main.js';
    script.async = true;
    document.body.appendChild(script);
  }

  async reportWhatsAppConversion() {
    const info = await firstValueFrom(this.infoService.viewInfo$);
    const whatsapp = info?.whatsapp;

    const url = `https://wa.me/57${whatsapp}?text=Hola%2C%20quiero%20más%20información`;

    // @ts-ignore
    gtag_report_conversion_whatsapp(url);
  }


}
