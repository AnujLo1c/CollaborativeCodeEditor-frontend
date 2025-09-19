import { Routes } from '@angular/router';
import { ProjectScreen } from './pages/project-screen/project-screen';
import { authGuard } from './auth-guard';
import { Project } from './pages/project/project';

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
        loadComponent: () => import('./pages/project/project').then(m => m.Project),
        canActivate: [authGuard]
    },
    {
        path: 'project/:id',
        
        component: ProjectScreen,
        canActivate: [authGuard]
     },
    { path: 'project/share/:shareId', component: Project,
        canActivate: [authGuard]
     }

   
];
