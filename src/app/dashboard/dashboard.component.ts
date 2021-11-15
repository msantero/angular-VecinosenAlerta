import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Categoria } from '../interfaces/categorias';
//import { Evento, Eventos, EventoResponse } from '../interfaces/eventos';

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

  categoriaalta: Categoria | undefined;
  categoria: Categoria = { id: '0' } as Categoria;
  categorias: Categoria[] = [{ id: '0', nombre: 'Choose one' } as Categoria];

  ngOnInit() {
    this.nombre_administrador = this.AdminService.getUserNombre();
    this.obtener_categorias(true);
  }

  categoriaGroup: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private AdminService: AdminService,
    private CategoriaService: CategoriaService,
    private router: Router
  ) {
    this.categoriaGroup = this.formBuilder.group({
      nombre: '',
      minutosExpiracion: 0,
    });
  }

  obtener_categorias(primeravez: boolean) {
    console.log('Obtengo categorias...');
    this.CategoriaService.getcategorias().subscribe(
      (cats) => {
        console.log('Categorias: ' + cats.toString());
        this.CategoriaService.setCategorias(<Categoria[]>cats);
        console.log('se obtuvo: ' + this.CategoriaService.categorias);

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
      ...this.categoriaGroup.value,
      categoriaId: this.categoria.id,
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
        id: '0',
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
      this.categoriaGroup.reset();
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
    this.CategoriaService.borrarcategoria(this.categoria.id);
  }
}
