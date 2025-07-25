import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://reqres.in/api/users';

  constructor(private http: HttpClient) {}

  getUsers(page: number = 1): Observable<User[]> {
    return this.http.get<any>(`${this.apiUrl}?page=${page}`).pipe(
      map(res => res.data as User[])
    );
  }
}

export type { User };
