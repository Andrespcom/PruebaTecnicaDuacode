import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService, User } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    // Configura el test con el módulo de HTTP mockeado
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    // Inyecta el servicio real (no espía)
    service = TestBed.inject(UserService);
  });

  // Test básico: el servicio se debe crear correctamente
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Verifica que se pueda añadir un usuario a la lista local
  it('should add user', () => {
    const user: User = {
      id: 1,
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@example.com',
      avatar: '',
    };

    service.addUser(user);

    // Comprobamos que el número total de usuarios haya aumentado
    expect(service.totalUsersCount).toBe(1);
  });

  // Comprueba que se pueda obtener un usuario por su ID
  it('should return user by id', () => {
    const user: User = {
      id: 5,
      first_name: 'Test',
      last_name: '',
      email: 'findme@example.com',
      avatar: '',
    };

    service.addUser(user);
    const result = service.getUserById(5);

    expect(result?.email).toBe('findme@example.com');
  });

  // Verifica que se pueda actualizar correctamente un usuario existente
  it('should update user details', () => {
    const user: User = {
      id: 10,
      first_name: 'Before',
      last_name: '',
      email: 'test@example.com',
      avatar: '',
    };

    service.addUser(user);

    const updated: User = {
      id: 10,
      first_name: 'After',
      last_name: '',
      email: 'test@example.com',
      avatar: '',
    };

    service.updateUser(updated);

    const result = service.getUserById(10);
    expect(result?.first_name).toBe('After');
  });

  // Asegura que un usuario puede eliminarse correctamente
  it('should delete user', () => {
    const user: User = {
      id: 789,
      first_name: 'ToDelete',
      last_name: 'User',
      email: 'delete@example.com',
      avatar: '',
    };

    service.addUser(user);
    service.deleteUser(789);

    // Si la eliminación fue exitosa, el resultado debe ser undefined
    expect(service.getUserById(789)).toBeUndefined();
  });
});