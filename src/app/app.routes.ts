import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', loadComponent: () => import('./pages/home/home').then(m => m.Home) },
  { path: 'calendar', loadComponent: () => import('./pages/calendar/calendar').then(m => m.Calendar) },
  { path: 'restrictions', loadComponent: () => import('./pages/restrictions/restrictions').then(m => m.Restrictions) },
  { path: 'about', loadComponent: () => import('./pages/about/about').then(m => m.About) },
  { path: 'news', loadComponent: () => import('./pages/news/news').then(m => m.News) },
  { path: 'info', loadComponent: () => import('./pages/info/info').then(m => m.Info) },
  { path: 'contact', loadComponent: () => import('./pages/contact/contact').then(m => m.Contact) }
];
