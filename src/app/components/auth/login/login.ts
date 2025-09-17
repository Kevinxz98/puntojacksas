import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Auth } from '../../../services/auth';
import { ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  errorMessage: string | null = null;
  email = '';
  password = '';
  token: string | null = null;
  user: any = null;
  isLoading = false;

  logo = 'assets/images/logo-full.png';

  togglePassword(){
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    if(passwordInput.type === 'password'){
      passwordInput.type = 'text';
    }else{
      passwordInput.type = 'password';
    }
  }

  constructor(private authService: Auth, private cdr: ChangeDetectorRef, private router: Router) {}

  login() {
    this.isLoading = true;
    this.errorMessage = null; // limpia al enviar
    this.authService.login({ email: this.email, password: this.password })
      .subscribe({
        next: (res) => {
          console.log('Login exitoso:', res);
          this.token = res.access_token;
          this.user = res.user;
          if (this.token) {
            localStorage.setItem('token', this.token);
            localStorage.setItem('user', JSON.stringify(this.user));
            this.router.navigate(['/dashboard']);
          }
          this.errorMessage = null; // limpio el error si entra
          this.cdr.detectChanges(); // 👈 fuerza update
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Error en el login';
          this.cdr.detectChanges(); // 👈 asegura que Angular pinte
        },
        complete: () => {
          this.isLoading = false; // habilitar de nuevo
        }
      });
  }

}
