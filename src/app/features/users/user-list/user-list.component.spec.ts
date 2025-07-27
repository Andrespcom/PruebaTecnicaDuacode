import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { UserService } from '../../../core/services/user.service';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let mockUserService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    mockUserService = jasmine.createSpyObj('UserService', ['getAllUsers']);
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
    mockUserService.users$ = of([]);
    await TestBed.configureTestingModule({
      imports: [UserListComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: () => '123' }),
          },
        },
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compileComponents();    

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(async () => {
    
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar usuarios en la lista', () => {
    expect(component.allUsers.length).toBeGreaterThan(0);
  });

  it('debería filtrar por nombre', () => {
    component.searchTerm = 'test';
    const filtered = component.filteredUsers;
    expect(filtered.length).toBe(1);
  });
});
