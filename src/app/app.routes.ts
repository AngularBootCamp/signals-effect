import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./employees-viewer/employee-viewer.component')
  }
];
