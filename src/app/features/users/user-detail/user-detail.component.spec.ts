import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDetailComponent } from './user-detail.component';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../core/services/user.service';

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;

  beforeEach(async () => {
    // Configuramos el entorno de pruebas con mocks
    await TestBed.configureTestingModule({
      imports: [UserDetailComponent],
      providers: [
        {
          // Simulamos el parámetro de ruta con ID 1
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => '1' } } },
        },
        {
          // Servicio simulado que devuelve un usuario de prueba
          provide: UserService,
          useValue: {
            getUserById: (id: number) => ({
              id,
              first_name: 'Test',
              last_name: 'User',
              email: 'test@user.com',
              avatar: ''
            }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Verifica que el componente se inicialice correctamente
  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  // Verifica que cargue el usuario correcto al iniciar
  it('debería cargar datos del usuario', () => {
    expect(component.user).toBeTruthy();
    expect(component.user?.id).toBe(1);
  });
});
