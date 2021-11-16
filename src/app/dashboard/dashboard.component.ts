import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Categoria } from '../interfaces/categorias';
import { Evento } from '../interfaces/eventos';

import { EventoService } from '../services/evento.service';
import { CategoriaService } from '../services/categoria.service';
import { AdminService } from '../services/administrador.service';

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

  categoriaalta: Categoria | undefined;
  categoria: Categoria = { _id: '0' } as Categoria;
  categorias: Categoria[] = [{ _id: '0', nombre: 'Choose one' } as Categoria];

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
        _id: '0',
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
        },
        ({ error: { mensaje } }) => {
          this.msg = mensaje;
          console.log('Mensaje de error:' + this.msg);
        }
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
    this.CategoriaService.borrarcategoria(BajaCat._Id);
    this.EliminarCategoriaGroup.reset();
    this.obtener_categorias(false);
  }

  obtener_eventos() {
    console.log('Obtengo eventos...');
    this.EventoService.geteventos().subscribe(
      (eve) => {
        console.log('Eventos: ' + eve.toString());
        this.EventoService.setEventos(<Evento[]>eve);
        console.log('se obtuvo eventos: ' + this.EventoService.eventos);

        this.eventos = this.EventoService.eventos;
        this.ver_eventos(this.eventos);
      },

      ({ error: { mensaje } }) => {
        this.msg = mensaje;
        console.log('Mensaje de error al obtener eventos: ' + this.msg);
      }
    );
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
}
