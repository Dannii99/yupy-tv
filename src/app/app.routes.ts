import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
      },
      {
        path: 'streamers',
        loadComponent: () => import('./features/streamers/streamers.component').then(m => m.StreamersComponent),
      },
      {
        path: 'favorites',
        loadComponent: () => import('./features/favorites/favorites.component').then(m => m.FavoritesComponent),
      },
      {
        path: 'settings',
        loadComponent: () => import('./features/settings/settings.component').then(m => m.SettingsComponent),
      },
    ],
  },
];
