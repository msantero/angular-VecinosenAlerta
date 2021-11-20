import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Administrador } from '../interfaces/administradores';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  admin: Administrador | undefined;
  private router: Router;
  constructor(private http: HttpClient) {}

  login(user: string, password: string): Observable<Administrador> {
    const headers = { 'Content-Type': 'application/json' };
    const body = JSON.stringify({ user, password });
    console.log('  body : ' + body.toString());
    return this.http.post<Administrador>(
      'https://vecinosenalerta.herokuapp.com/login/admin',
      body,
      {
        headers,
      }
    );
  }

  registro(user: string, password: string): Observable<Administrador> {
    const headers = { 'Content-type': 'application/json' };
    const body = JSON.stringify({ user, password });
    return this.http.post<Administrador>(
      'https://vecinosenalerta.herokuapp.com/admin',
      body,
      {
        headers,
      }
    );
  }

  setUser(admin: any) {
    this.admin = <Administrador>admin;
  }

  getUser() {
    return this.admin;
  }

  getUserId() {
    return this.admin?._id;
  }

  getUserNombre() {
    return this.admin?.user;
  }

  logOut() {
    this.admin = undefined;
  }
}
