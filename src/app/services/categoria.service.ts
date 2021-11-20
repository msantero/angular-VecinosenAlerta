import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { AdminService } from '../services/administrador.service';
import { Observable } from 'rxjs';

import { Categoria, CategoriaRequest } from '../interfaces/categorias';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  categoria: Categoria | undefined;
  categorias: Categoria[];
  private router: Router;
  constructor(private http: HttpClient, private userService: AdminService) {}

  getcategorias(): Observable<Categoria[]> {
    const headers = {
      'Content-type': 'application/json',
    };

    //const body = JSON.stringify({ usuario, password });
    return this.http.get<Categoria[]>(
      'https://vecinosenalerta.herokuapp.com/categoria/',
      {
        headers,
        responseType: 'json',
      }
    );
  }

  altacategoria(categoria: CategoriaRequest): Observable<CategoriaRequest> {
    const headers = {
      'Content-type': 'application/json',
    };
    const body = JSON.stringify(categoria);
    return this.http.post<Categoria>(
      'https://vecinosenalerta.herokuapp.com/categoria',
      body,
      {
        headers,
      }
    );
  }

  borrarcategoria(id: String) {
    const headers = {
      'Content-type': 'application/json',
    };

    return this.http.delete(
      'https://vecinosenalerta.herokuapp.com/categoria/' + id,
      {
        headers,
      }
    );
  }

  /*
  borrarcategoria(id: String) {
    const headers = {
      'Content-type': 'application/json',
    };

    return this.http
      .delete('https://vecinosenalerta.herokuapp.com/categoria/' + id, {
        headers,
      })
      .subscribe({
        next: (data) => {
          console.log('Delete successful');
        },
        error: (error) => {
          console.error('There was an error!', error.message);
        },
      });
  }
*/
  setCategorias(cat: any) {
    this.categorias = <Categoria[]>cat;
  }

  getCategoria() {
    return this.categoria;
  }

  getId() {
    return this.categoria?._id;
  }
}
