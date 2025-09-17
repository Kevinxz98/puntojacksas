import { Component, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.css',
  encapsulation: ViewEncapsulation.None,
})
export class AuthLayout  implements AfterViewInit {
  ngAfterViewInit() {
    const script = document.createElement('script');
    script.src = 'assets/js/login.js';
    script.async = true;
    document.body.appendChild(script);
  }
}
