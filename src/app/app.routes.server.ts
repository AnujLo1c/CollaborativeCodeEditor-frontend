import { RenderMode, ServerRoute } from '@angular/ssr';
import { authGuard } from './auth-guard';
import { ProjectScreen } from './pages/project-screen/project-screen';
import { Project } from './pages/project/project';

export const serverRoutes: ServerRoute[] = [
    {
           path: '',
           renderMode: RenderMode.Prerender,
       },
       {
           path: 'login',
           renderMode: RenderMode.Prerender
       },
       {
           path: 'register',
           renderMode: RenderMode.Prerender
       },
       {
           path: 'project',
           renderMode: RenderMode.Prerender,
          
       },
       {
           path: 'project/:id',
           renderMode: RenderMode.Client,
           
           
        },
       { path: 'project/share/:shareId',
           renderMode: RenderMode.Client,}
   
];
