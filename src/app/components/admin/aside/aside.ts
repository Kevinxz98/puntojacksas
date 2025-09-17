import { Component } from '@angular/core';
import { Auth } from '../../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aside',
  imports: [],
  templateUrl: './aside.html',
  styleUrl: './aside.css'
})
export class Aside {
logo = 'assets/images/logo-full.png';
user: any = null;

  constructor(private authService: Auth, private router: Router ) {}

  ngOnInit() {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    }
  }

  logout() {
    this.authService.logout().subscribe({
      next: (res) => {
        console.log('Logout exitoso:', res);
      },
      error: (err) => {
        console.error('Error al cerrar sesión:', err);
      },
      complete: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
      }
    });
  }

}
