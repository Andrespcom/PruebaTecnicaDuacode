import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserFormComponent } from './user-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { UserService } from '../../../core/services/user.service';

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    // Se crea un espía del UserService con solo el método addUser
    const userServiceMock = jasmine.createSpyObj('UserService', ['addUser']);

    await TestBed.configureTestingModule({
      // Se importa el componente standalone directamente
      imports: [UserFormComponent],
      providers: [
        // Ruta sin parámetro (formulario en modo creación)
        { provide: UserService, useValue: userServiceMock },
        { provide: ActivatedRoute, useValue: { paramMap: of({ get: () => null }) } },
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate']) }
      ]
    }).compileComponents();

    // Se instancia el componente y se inyecta el espía del servicio
    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;

    fixture.detectChanges();
  });

  // Verifica que el componente se cree correctamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Verifica que al enviar el formulario se llame a addUser
  it('should call addUser when form is submitted', () => {
    // Se rellena el formulario con datos válidos
    component.form.setValue({
      first_name: 'Nuevo',
      last_name: 'Usuario',
      email: 'nuevo@correo.com',
      avatar: ''
    });

    // Se simula el envío del formulario
    component.onSubmit();

    // Se comprueba que el método addUser haya sido invocado
    expect(userServiceSpy.addUser).toHaveBeenCalled();
  });
});