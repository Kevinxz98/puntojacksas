import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Auth } from '../services/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private authService: Auth,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    
    const token = localStorage.getItem('token');
    const user = this.authService.getUser();

    if (token && user) {
      return true;
    } else {
      this.router.navigate(['/admin/login'], { 
        queryParams: { returnUrl: state.url } 
      });
      return false;
    }
  }
}