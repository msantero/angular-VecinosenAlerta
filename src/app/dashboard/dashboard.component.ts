import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Categoria, CategoriaRequest } from '../interfaces/categorias';
import {
  Evento,
  EventosxCategoria,
  CantCategoriaEventos,
  CantEventosxMes,
} from '../interfaces/eventos';

import { EventoService } from '../services/evento.service';
import { CategoriaService } from '../services/categoria.service';
import { AdminService } from '../services/administrador.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  nombre_administrador: string;
  msg: string;
  evento: Evento | undefined;
  eventos: Evento[] = [];

  categoriaalta: CategoriaRequest | undefined;
  categoria: Categoria = { _id: '0' } as Categoria;
  categorias: Categoria[] = [{ _id: '0', nombre: 'Choose one' } as Categoria];

  EventosxCategoria: EventosxCategoria[] = [];
  CantCategoriaEventos: CantCategoriaEventos[] = [];
  CantEventosxMes: CantEventosxMes[] = [];

  activodesactivo: string[] = [
    'Seleccione estado:',
    'Todas',
    'Activas',
    'Inactivas',
  ];
  eventosaux: Evento[] = [];
  seleccionado: string;

  ngOnInit() {
    this.nombre_administrador = this.AdminService.getUserNombre();
    this.obtener_categorias(true);
    this.obtener_eventos();
  }

  AltaCategoriaGroup: FormGroup;
  EliminarCategoriaGroup: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private AdminService: AdminService,
    private CategoriaService: CategoriaService,
    private EventoService: EventoService,
    private router: Router
  ) {
    this.AltaCategoriaGroup = this.formBuilder.group({
      nombre: '',
      minutosExpiracion: 0,
    });

    this.EliminarCategoriaGroup = this.formBuilder.group({
      _id: '',
    });
  }

  obtener_categorias(primeravez: boolean) {
    console.log('Obtengo categorias...');
    this.CategoriaService.getcategorias().subscribe(
      (cats) => {
        console.log('Categorias: ' + cats.toString());
        this.CategoriaService.setCategorias(<Categoria[]>cats);
        console.log(
          'se obtuvo categorias: ' + this.CategoriaService.categorias
        );

        if (primeravez) {
          this.categorias = this.categorias.concat(
            this.CategoriaService.categorias
          );
        } else {
          this.categorias = this.CategoriaService.categorias;
        }
        this.obtener_eventos();
      },

      ({ error: { mensaje } }) => {
        this.msg = mensaje;
        console.log('Mensaje de error al obtener paquetes: ' + this.msg);
      }
    );
  }

  altacategoria() {
    const AltaCat = {
      ...this.AltaCategoriaGroup.value,
      categoriaId: this.categoria._id,
    };

    if (AltaCat?.nombre == '') {
      this.msg = 'Debe ingresar nombre' + AltaCat?.nombre;
    } else if (AltaCat?.minutosExpiracion === 0) {
      this.msg = 'Debe ingresar cantidad de minutos';
    } else {
      this.msg = 'Procesando alta...';

      //creo y cargo objeto para mandar al REST
      //let venta =  Venta;

      this.categoriaalta = {
        //_id: '0',
        nombre: AltaCat.nombre,
        minutosExpiracion: AltaCat.minutosExpiracion,
      };

      console.log(
        'Se envia categoria para alta: minutos' +
          this.categoriaalta.minutosExpiracion +
          '  nombre' +
          this.categoriaalta.nombre +
          ' y el AltaCat es: ' +
          AltaCat.nombre
      );

      this.CategoriaService.altacategoria(this.categoriaalta).subscribe(
        (cat) => {
          this.CategoriaService.setCategorias(<Categoria>cat);
          //this.ventaService.user.usuario = usuario
          this.msg = 'Categoria -  Ingresada ';
          //this.categorias = null;
          this.obtener_categorias(false);
          this.obtener_eventos();
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log('Client-side error: ' + err.message);
          } else {
            console.log('Server-side error: ' + err.message);
          }
          this.msg = 'Error al dar de alta la categoría.';
        }
        /*
        ({ error: { mensaje } }) => {
          this.msg = mensaje;
          console.log('Mensaje de error:' + this.msg);
        }
        */
      );

      //this.obtener_categorias();

      AltaCat.minutosExpiracion = 0;
      AltaCat.nombre = '';
      this.AltaCategoriaGroup.reset();
    }

    console.log(
      this.msg +
        ' id: ' +
        this.CategoriaService.getId() +
        ' nombre: ' +
        AltaCat?.nombre +
        ' minutosExpiracion: ' +
        AltaCat?.minutosExpiracion
    );
  }

  eliminar() {
    const BajaCat = {
      ...this.EliminarCategoriaGroup.value,
      _Id: this.categoria._id,
    };
    console.log('Se va a borrar la cat con id: ' + BajaCat._Id);
    this.msg = 'Eliminando categoria con id: ' + BajaCat._Id;

    this.CategoriaService.borrarcategoria(BajaCat._Id).subscribe(
      () => {
        console.log('se borro categoria: ');

        this.EliminarCategoriaGroup.reset();
        this.obtener_categorias(false);
        this.obtener_eventos();
        this.msg = '';
      },

      ({ error: { mensaje } }) => {
        this.msg = mensaje;
        console.log('Mensaje de error al eliminar categoria: ' + this.msg);
      }
    );

    //this.CategoriaService.borrarcategoria(BajaCat._Id);
    this.EliminarCategoriaGroup.reset();
    this.obtener_categorias(false);
  }

  desactivarEvento(idEvento: String) {
    console.log('id evento a desactivar ' + idEvento);
    this.EventoService.desactivarEvento(idEvento).subscribe(
      () => {
        this.obtener_eventos();
        this.msg = '';
      },
      ({ error: { mensaje } }) => {
        this.msg = mensaje;
        console.log('Mensaje de error al desactivar alerta: ' + this.msg);
      }
    );
  }

  obtener_eventos() {
    console.log('Obtengo eventos...');
    this.EventoService.geteventos().subscribe(
      (eve) => {
        console.log('Eventos: ' + eve.toString());
        this.EventoService.setEventos(<Evento[]>eve);
        console.log('se obtuvo eventos: ' + this.EventoService.eventos);

        this.eventos = this.EventoService.eventos;
        this.obtener_cant_eventos_categoria(this.eventos, this.categorias);
        //this.ver_eventos(this.eventos);
        this.desactivaractivarcombo_eventos('Todas');
      },

      ({ error: { mensaje } }) => {
        this.msg = mensaje;
        console.log('Mensaje de error al obtener eventos: ' + this.msg);
      }
    );
  }

  obtener_cant_eventos_categoria(eventos: Evento[], categorias: Categoria[]) {
    console.log('Obtengo cantidad de eventos por categoria...');
    this.CantCategoriaEventos = [];

    categorias.forEach((cat) => {
      let frs = eventos.filter((element) => element.categoria._id === cat._id);
      var cantidad = 0;

      frs.forEach((element) => {
        cantidad++;
      });

      let cantcateve = {
        idcategoria: cat._id,
        nombre: cat.nombre,
        cantidad: cantidad,
      };

      cat._id != '0' ? this.CantCategoriaEventos.push(cantcateve) : '';
    });
  }

  obtener_categorias_por_mes() {
    /*
    let evexmes = {
      mes: eve.fechaPublicacion.getMonth(),
      anio: eve.fechaPublicacion.getFullYear(),
      cantidad: cantidad,
    }; */
    //this.CantEventosxMes.push(evexmes);
    // this.CantEventosxMes.sort();
  }

  checkButtonDesactivar(evento: Evento) {
    if (evento.estaActivo) {
      return true;
    } else {
      return false;
    }
  }

  ver_eventos(eventos: Evento[]) {
    console.log('Obtengo  eventos...');

    eventos.forEach((evento) => {
      console.log(
        'eventos: id: ' +
          evento._id +
          ' titulo: ' +
          evento.titulo +
          ' idcategoria ' +
          evento.categoria._id +
          ' idusuario ' +
          evento.usuario._id
      );
    });
  }

  desactivaractivarcombo_eventos(seleccionado) {
    console.log('Obtengo  combo seleccionado...' + seleccionado);
    this.eventosaux = [] = [];
    if (seleccionado == 'Activas') {
      this.eventos.forEach((evento) => {
        if (evento.estaActivo == true) {
          this.eventosaux.push(evento);
        }
      });
    } else if (seleccionado == 'Inactivas') {
      this.eventos.forEach((evento) => {
        if (evento.estaActivo == false) {
          this.eventosaux.push(evento);
        }
      });
    } else {
      this.obtener_eventos();
      this.eventosaux = this.eventos;
    }
  }

  logOut() {
    this.AdminService.logOut();
    this.router.navigate(['/login']);
  }
}
