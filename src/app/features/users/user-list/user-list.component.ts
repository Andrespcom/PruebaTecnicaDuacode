import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService, User } from '../../../core/services/user.service';
import { take } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {
  private userService = inject(UserService);

  // Lista completa de usuarios disponibles (API + locales)
  allUsers: User[] = [];

  // Página actual para la paginación
  currentPage: number | null = 1;

  // Número de usuarios a mostrar por página
  usersPerPage = 6;

  // Término de búsqueda introducido por el usuario
  searchTerm = '';

  // Estado actual del orden (ascendente, descendente o sin orden)
  sortState: 'asc' | 'desc' | 'none' = 'none';

  // Flag para mostrar una alerta cuando no hay más usuarios al cargar más
  showAlert = false;

  // Total de páginas basado en los usuarios filtrados
  get totalPages(): number {
    return Math.ceil(this.filteredUsers.length / this.usersPerPage);
  }

  // Aplica filtro de búsqueda y ordenación sobre los usuarios
  get filteredUsers(): User[] {
    let users = [...this.allUsers];

    // Filtro por nombre o apellido
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      users = users.filter(
        (user) =>
          user.first_name.toLowerCase().includes(term) ||
          user.last_name.toLowerCase().includes(term)
      );
    }

    // Orden ascendente o descendente por nombre
    if (this.sortState === 'asc') {
      users.sort((a, b) => a.first_name.localeCompare(b.first_name));
    } else if (this.sortState === 'desc') {
      users.sort((a, b) => b.first_name.localeCompare(a.first_name));
    }

    return users;
  }

  // Devuelve los usuarios visibles en la página actual
  get pagedUsers(): User[] {
    // Si se ha pulsado "Cargar más", se muestran todos los usuarios filtrados
    if (this.currentPage === null) {
      return this.filteredUsers;
    }

    const start = (this.currentPage - 1) * this.usersPerPage;
    return this.filteredUsers.slice(start, start + this.usersPerPage);
  }

  // Inicializa el componente cargando todos los usuarios una única vez
  ngOnInit(): void {
    this.userService
      .getAllUsers()
      .pipe(take(1))
      .subscribe((users) => {
        this.allUsers = users;
      });

    // Se suscribe a los cambios en la lista de usuarios
    this.userService.users$.subscribe((users) => {
      this.allUsers = users;
    });
  }

  // Cambia la página activa en la paginación
  setPage(page: number) {
    this.currentPage = page;
  }

  // Activa el modo "ver todos", desactivando la paginación
  loadMore() {
    this.currentPage = null;

    const total = this.userService.totalUsersCount;

    // Muestra alerta si ya se han cargado todos los usuarios
    if (this.allUsers.length >= total) {
      this.showAlert = true;
      setTimeout(() => (this.showAlert = false), 2000);
    }
  }

  // Elimina un usuario por su ID, tanto visualmente como en el servicio
  deleteUser(id: number) {
    this.userService.deleteUser(id);
    this.allUsers = this.allUsers.filter((u) => u.id !== id);
  }

  // Cambia el estado de ordenación entre ascendente, descendente y sin orden
  toggleSort() {
    if (this.sortState === 'none') {
      this.sortState = 'asc';
    } else if (this.sortState === 'asc') {
      this.sortState = 'desc';
    } else {
      this.sortState = 'none';
    }
  }
}
