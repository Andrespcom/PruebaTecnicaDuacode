import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService, User } from '../../../core/services/user.service';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
})
export class UserFormComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private userService = inject(UserService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  // Formulario reactivo con validaciones básicas
  form = this.fb.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    avatar: [''],
  });

  editing = false;  // Indica si estamos en modo edición
  userId: number | null = null;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editing = true;
      this.userId = +id;
      const user = this.userService.getUserById(this.userId);
      if (user) {
        // Prellenamos el formulario si el usuario existe
        this.form.patchValue(user);
      }
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const user: User = {
        id: this.userId ?? 0,
        first_name: this.form.value.first_name ?? '',
        last_name: this.form.value.last_name ?? '',
        email: this.form.value.email ?? '',
        avatar: this.form.value.avatar ?? '',
      };

      if (this.editing) {
        this.userService.updateUser(user);
      } else {
        this.userService.addUser(user);
      }

      this.router.navigate(['/']);  // Redirige a la lista de usuarios
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
