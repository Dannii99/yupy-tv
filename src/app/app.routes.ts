import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
      },
      {
        path: 'trending-game/:id',
        loadComponent: () => import('./features/trending-game/trending-game-view.component').then(m => m.TrendingGameViewComponent),
      },
      {
        path: 'games',
        loadComponent: () => import('./features/games/games.component').then(m => m.GamesComponent),
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
      {
        path: 'stream/:id',
        loadComponent: () => import('./features/stream/stream-view.component').then(m => m.StreamViewComponent),
      },
    ],
  },
];
