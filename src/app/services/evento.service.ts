import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { AdminService } from '../services/administrador.service';
import { Observable } from 'rxjs';

import { Evento } from '../interfaces/eventos';

@Injectable({
  providedIn: 'root',
})
export class EventoService {
  evento: Evento | undefined;
  eventos: Evento[];
  private router: Router;
  constructor(private http: HttpClient, private AdminService: AdminService) {}

  geteventos(): Observable<Evento[]> {
    const headers = {
      'Content-type': 'application/json',
    };

    //const body = JSON.stringify({ usuario, password });
    return this.http.get<Evento[]>(
      'https://vecinosenalerta.herokuapp.com/eventos',
      {
        headers,
        responseType: 'json',
      }
    );
  }

  desactivarEvento(id: String) {
    const headers = {
      'Content-type': 'application/json',
    };
    
    return this.http.put(
      'https://vecinosenalerta.herokuapp.com/desactivarevento/' + '?id=' + id,
      {
        headers,
      }
    );
  }

  setEventos(eve: any) {
    this.eventos = <Evento[]>eve;
  }

  getEvento() {
    return this.evento;
  }

  getId() {
    return this.evento?._id;
  }
}
