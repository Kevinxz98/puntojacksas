import { Routes } from '@angular/router';
import { Login } from './components/auth/login/login';
import { Register } from './components/auth/register/register';
import { Home } from './home/home';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { MainLayout } from './layouts/main-layout/main-layout';
import { AdminLayout } from './layouts/admin-layout/admin-layout';
import { Dashboard } from './components/admin/dashboard/dashboard';


export const routes: Routes = [
 
    {
        path: '',
        component: MainLayout,
        children: [
        { path: '', component: Home },
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
        ]
    },
];
