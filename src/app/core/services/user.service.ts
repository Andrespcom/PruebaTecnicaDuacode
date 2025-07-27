import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, map, switchMap } from 'rxjs/operators';

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // Subject para emitir la lista de usuarios actualizada
  private _users = new BehaviorSubject<User[]>([]);
  public users$: Observable<User[]> = this._users.asObservable();

  // Lista de usuarios creados localmente (ya que la API no guarda cambios)
  private localUsers: User[] = [];

  // Número de página actual
  private currentPage = 1;

  // Usuarios por página
  private perPage = 6;

  constructor(private http: HttpClient) {}

  // Carga la siguiente página de usuarios desde la API y actualiza el estado
  loadUsers(): Observable<User[]> {
    const headers = new HttpHeaders({
      'x-api-key': 'reqres-free-v1',
    });

    return this.http
      .get<any>(
        `https://reqres.in/api/users?page=${this.currentPage}&per_page=${this.perPage}`,
        { headers }
      )
      .pipe(
        tap((res) => {
          const apiUsers = res.data as User[];

          // Evitamos duplicados usando un Set de IDs actuales
          const currentIds = new Set(this._users.value.map((u) => u.id));
          const newApiUsers = apiUsers.filter((u) => !currentIds.has(u.id));

          // Solo añadimos usuarios locales que no se hayan incluido aún
          const newLocalUsers = this.localUsers.filter(
            (u) =>
              !currentIds.has(u.id) && !newApiUsers.find((n) => n.id === u.id)
          );

          const finalUsers = [
            ...this._users.value,
            ...newApiUsers,
            ...newLocalUsers,
          ];

          this._users.next(finalUsers);
          this.currentPage++;
        }),
        map((res) => res.data as User[])
      );
  }

  // Añade un nuevo usuario solo en memoria
  addUser(user: User) {
    user.id = Date.now();
    this.localUsers.push(user);
    this._users.next([...this._users.value, user]);
  }

  // Elimina un usuario tanto del array local como del observable principal
  deleteUser(id: number) {
    this.localUsers = this.localUsers.filter((u) => u.id !== id);
    const filtered = this._users.value.filter((u) => u.id !== id);
    this._users.next(filtered);
  }

  // Busca un usuario por su ID
  getUserById(id: number): User | undefined {
    return this._users.value.find((u) => u.id === id);
  }

  // Actualiza los datos de un usuario, reemplazándolo por su versión nueva
  updateUser(updated: User) {
    const list = this._users.value.map((u) =>
      u.id === updated.id ? updated : u
    );
    this.localUsers = this.localUsers.map((u) =>
      u.id === updated.id ? updated : u
    );
    this._users.next(list);
  }

  // Devuelve el número total de usuarios gestionados (API + locales)
  get totalUsersCount(): number {
    return this._users.value.length;
  }

  // Carga todos los usuarios disponibles desde la API de forma recursiva
  getAllUsers(): Observable<User[]> {
    if (this._users.value.length > 0) {
      return of(this._users.value);
    }

    const headers = new HttpHeaders({
      'x-api-key': 'reqres-free-v1',
    });

    const loadPages = (
      page: number,
      accumulated: User[]
    ): Observable<User[]> => {
      return this.http
        .get<any>(
          `https://reqres.in/api/users?page=${page}&per_page=${this.perPage}`,
          { headers }
        )
        .pipe(
          switchMap((res) => {
            const pageUsers = res.data as User[];
            const combined = [...accumulated, ...pageUsers];

            // Si quedan más páginas, recursivamente seguimos
            if (page < res.total_pages) {
              return loadPages(page + 1, combined);
            } else {
              // Añadimos los usuarios locales que no estén duplicados
              const withLocal = [
                ...combined,
                ...this.localUsers.filter(
                  (lu) => !combined.some((au) => au.id === lu.id)
                ),
              ];

              this._users.next(withLocal);
              this.currentPage = res.total_pages + 1;
              return of(withLocal);
            }
          })
        );
    };

    return loadPages(1, []);
  }
}
