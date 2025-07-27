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
  allUsers: User[] = [];
  currentPage: number | null = 1;
  usersPerPage = 6;
  searchTerm = '';
  sortState: 'asc' | 'desc' | 'none' = 'none';
  showAlert = false;

  get totalPages(): number {
    return Math.ceil(this.filteredUsers.length / this.usersPerPage);
  }

  get filteredUsers(): User[] {
    let users = [...this.allUsers];

    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      users = users.filter(
        (user) =>
          user.first_name.toLowerCase().includes(term) ||
          user.last_name.toLowerCase().includes(term)
      );
    }

    if (this.sortState === 'asc') {
      users.sort((a, b) => a.first_name.localeCompare(b.first_name));
    } else if (this.sortState === 'desc') {
      users.sort((a, b) => b.first_name.localeCompare(a.first_name));
    }

    return users;
  }

  get pagedUsers(): User[] {
    if (this.currentPage === null) {
      return this.filteredUsers;
    }

    const start = (this.currentPage - 1) * this.usersPerPage;
    return this.filteredUsers.slice(start, start + this.usersPerPage);
  }

  ngOnInit(): void {
    this.userService
      .getAllUsers()
      .pipe(take(1))
      .subscribe((users) => {
        this.allUsers = users;
      });

    this.userService.users$.subscribe((users) => {
      this.allUsers = users;
    });
  }

  setPage(page: number) {
    this.currentPage = page;
  }

  loadMore() {
    this.currentPage = null;

    const total = this.userService.totalUsersCount;
    if (this.allUsers.length >= total) {
      this.showAlert = true;
      setTimeout(() => (this.showAlert = false), 2000);
    }
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id);
    this.allUsers = this.allUsers.filter((u) => u.id !== id);
  }

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
