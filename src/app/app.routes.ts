import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/users/user-list/user-list.component').then(
        (m) => m.UserListComponent
      ),
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./features/users/user-form/user-form.component').then(
        (m) => m.UserFormComponent
      ),
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./features/users/user-form/user-form.component').then(
        (m) => m.UserFormComponent
      ),
  },
  {
    path: 'detail/:id',
    loadComponent: () =>
      import('./features/users/user-detail/user-detail.component').then(
        (m) => m.UserDetailComponent
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];