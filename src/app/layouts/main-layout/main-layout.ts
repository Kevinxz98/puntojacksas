import { Component, AfterViewInit, OnInit  } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ViewEncapsulation } from '@angular/core';
import { Information } from '../../services/information';

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

  constructor(private infoService: Information) {}

  ngOnInit(): void {
    this.infoService.loadInformation();
  }

  ngAfterViewInit() {
    const script = document.createElement('script');
    script.src = 'assets/js/main.js';
    script.async = true;
    document.body.appendChild(script);
  }
}
