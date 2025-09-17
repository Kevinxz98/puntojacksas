import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../../services/auth';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  errorMessage: string | null = null;
  successMessage: string | null = null;

  togglePassword(){
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    if(passwordInput.type === 'password'){
      passwordInput.type = 'text';
    }else{
      passwordInput.type = 'password';
    }
  }

  toggleConfirmPassword(){
    const passwordInput = document.getElementById('confirmPassword') as HTMLInputElement;
    if(passwordInput.type === 'password'){
      passwordInput.type = 'text';
    }else{
      passwordInput.type = 'password';
    } 
  }

  logo = 'assets/images/logo-full.png';

  constructor(private authService: Auth, private cdr: ChangeDetectorRef, private router: Router) {}

  register() {
    this.errorMessage = null;
    this.successMessage = null; // limpia al enviar

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden ❌';
      this.cdr.detectChanges();
      return;
    }

    this.authService.register({ 
      name: this.name, 
      email: this.email, 
      password: this.password,
      password_confirmation: this.confirmPassword
     }).subscribe({
        next: (res) => {
          this.successMessage = res.message || 'Registro exitoso. Por favor, inicie sesión.';
          this.errorMessage = null;
          localStorage.setItem('token', res.access_token);
          localStorage.setItem('user', JSON.stringify(res.user));
          this.cdr.detectChanges(); // 
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Error en el registro';
          this.successMessage = null;
          this.cdr.detectChanges(); // 
        }
      })
    }
}
