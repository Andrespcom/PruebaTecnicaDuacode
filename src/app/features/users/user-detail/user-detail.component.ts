//
// Componente de detalle de usuario, usando Standalone API
//
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-detail.component.html',
})
export class UserDetailComponent implements OnInit {
  // Inyección de dependencias moderna usando `inject()
  private route = inject(ActivatedRoute);  
  private userService = inject(UserService);
  user?: User;

  ngOnInit(): void {
    // Obtiene el ID del usuario desde la ruta y lo busca en el servicio
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.user = this.userService.getUserById(id);
  }

  // Volver atrás en el historial del navegador
  goBack(): void {
    window.history.back();
  }
}
