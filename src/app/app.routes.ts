import { Routes } from '@angular/router';
import { Login } from './components/auth/login/login';
import { Register } from './components/auth/register/register';
import { Home } from './home/home';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { MainLayout } from './layouts/main-layout/main-layout';
import { AdminLayout } from './layouts/admin-layout/admin-layout';
import { Dashboard } from './components/admin/dashboard/dashboard';
import { AdminInfo } from './components/admin/admin-info/admin-info';
import { AdminServicios } from './components/admin/admin-servicios/admin-servicios';
import { ServicioDetalle } from './components/servicio-detalle/servicio-detalle';

export const routes: Routes = [
 
    {
        path: '',
        component: MainLayout,
        children: [
        { path: '', component: Home },
        { path: 'servicio', component: ServicioDetalle },
        
        ]
    },
    {
        path: '',
        component: AuthLayout,
        children: [
        { path: 'login', component: Login },
        { path: 'register', component: Register },
        ]
    },
    {
        path: '',
        component: AdminLayout,
        children: [
        { path: 'dashboard', component: Dashboard },
        { path: 'admin-information', component: AdminInfo },
        { path: 'admin-servicios', component: AdminServicios },
        ]
    },
];
