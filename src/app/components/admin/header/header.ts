import { Component, OnInit } from '@angular/core';
import { Auth } from '../../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit {
  userName: string | null = null;
  userEmail: string | null = null;

  constructor(private authService: Auth, private router: Router) {}

  ngOnInit() {
    const user = this.authService.getUser();
    this.userName = user ? user.name : null;
    this.userEmail = user ? user.email : null;
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
        this.router.navigate(['/admin/login']);
      }
    });
  }


}
