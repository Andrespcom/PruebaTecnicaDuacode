import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { UserService } from '../../../core/services/user.service';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let mockUserService: jasmine.SpyObj<UserService>;

  // Configuración inicial del test
  beforeEach(async () => {
    // Se crea un espía del servicio con el método getAllUsers simulado
    mockUserService = jasmine.createSpyObj('UserService', ['getAllUsers']);

    // Se simula una respuesta con un usuario de prueba
    mockUserService.getAllUsers.and.returnValue(
      of([
        {
          id: 1,
          first_name: 'Test',
          last_name: 'User',
          email: 'test@example.com',
          avatar: '',
        },
      ])
    );

    // Se simula el observable público users$ del servicio
    mockUserService.users$ = of([]);

    await TestBed.configureTestingModule({
      // Importamos el componente standalone directamente
      imports: [UserListComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: () => '123' }), // mock para simular la ruta activa
          },
        },
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compileComponents();

    // Se crea la instancia del componente y se activa la detección de cambios
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Verifica que el componente se cree correctamente
  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  // Comprueba que se hayan cargado usuarios tras la inicialización
  it('debería mostrar usuarios en la lista', () => {
    expect(component.allUsers.length).toBeGreaterThan(0);
  });

  // Verifica que el filtro por nombre funcione correctamente
  it('debería filtrar por nombre', () => {
    component.searchTerm = 'test';
    const filtered = component.filteredUsers;
    expect(filtered.length).toBe(1);
  });
});