import { Component, AfterViewInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css',
  encapsulation: ViewEncapsulation.None,
})
export class AdminLayout implements AfterViewInit {
ngAfterViewInit() {
    const script = document.createElement('script');
    script.src = 'assets/js/mainAdmin.js';
    script.async = true;
    document.body.appendChild(script);
  }
}
