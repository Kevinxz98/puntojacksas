import { Component, AfterViewInit, OnInit  } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ViewEncapsulation } from '@angular/core';
import { Information } from '../../services/information';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
  encapsulation: ViewEncapsulation.None,
})
export class MainLayout implements AfterViewInit, OnInit {


  infoData: any = null;

  constructor(private infoService: Information, private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0); 
      }
    });
  }

  ngOnInit(): void {
    this.infoService.loadViewInfo();
  }

  ngAfterViewInit() {
    const script = document.createElement('script');
    script.src = 'assets/js/main.js';
    script.async = true;
    document.body.appendChild(script);
  }
}
