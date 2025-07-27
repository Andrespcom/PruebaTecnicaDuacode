import { Routes } from '@angular/router';

// Definimos las rutas principales de la aplicación
export const routes: Routes = [
  {
    path: '',
    // Carga del componente de listado de usuarios
    loadComponent: () =>
      import('./features/users/user-list/user-list.component').then(
        (m) => m.UserListComponent
      ),
  },
  {
    path: 'add',
    // Ruta para crear un nuevo usuario
    loadComponent: () =>
      import('./features/users/user-form/user-form.component').then(
        (m) => m.UserFormComponent
      ),
  },
  {
    path: 'edit/:id',
    // Ruta para editar un usuario existente por su ID
    loadComponent: () =>
      import('./features/users/user-form/user-form.component').then(
        (m) => m.UserFormComponent
      ),
  },
  {
    path: 'detail/:id',
    // Ruta para ver el detalle de un usuario por su ID
    loadComponent: () =>
      import('./features/users/user-detail/user-detail.component').then(
        (m) => m.UserDetailComponent
      ),
  },
  {
    path: '**',
    // Ruta a cualquier ruta desconocida al listado
    redirectTo: '',
  },
];