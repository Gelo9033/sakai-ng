import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Notfound } from './app/pages/notfound/notfound';

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
          {
        path: '',
        loadComponent: () =>
          import(
            './app/layout/component/app.layout'
          ).then((m) => m.AppLayout),
          //canActivate:[AuthGuard]
      },
      {
        path: 'administracion',
        children: [
          {
            path: 'unidades',
            loadComponent: () =>
              import(
                './app/pages/administracion/unidades.component'
              ).then((m) => m.UnidadesComponent),
          },]}
        ]
    },
    { path: 'notfound', component: Notfound },
    { path: '**', redirectTo: '/notfound' }
];
