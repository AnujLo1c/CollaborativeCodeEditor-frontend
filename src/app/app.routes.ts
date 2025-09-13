import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',

        loadComponent: () => import('./pages/home/home').then(m => m.Home)
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login').then(m => m.Login)
    },
    {
        path: 'register',
        loadComponent: () => import('./pages/register/register').then(m => m.Register)
    },
    {
        path: 'project',
        loadComponent: () => import('./pages/project/project').then(m => m.Project)
    },
    {
        path: 'project/:id',
        loadComponent:() => import('./pages/project-screen/project-screen').then(m=>m.ProjectScreen)
    }
   
];
