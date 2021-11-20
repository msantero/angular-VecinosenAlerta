import { Component, OnInit } from '@angular/core';

import { Administrador } from '../interfaces/administradores';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../services/administrador.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  usuario: string;
  password: string;
  passwordreplay: string;
  msg: string;

  registroGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private router: Router
  ) {
    this.registroGroup = this.formBuilder.group({
      usuario: '',
      password: '',
      passwordreplay: '',
    });
  }

  ngOnInit() {}

  registro() {
    this.msg = 'Registrando...';
    const { usuario, password, passwordreplay } = this.registroGroup.value;

    if (!usuario || !password) {
      this.msg = 'Debe ingresar el nombre y password';
    } else if (password !== passwordreplay) {
      this.msg = 'La confirmación del password debe ser la misma que el pass.';
    } else {
      this.adminService.registro(usuario, password).subscribe(
        (user) => {
          this.adminService.setUser(<Administrador>user);
          this.adminService.admin.user = usuario;
          /*
          console.log('User: ' + this.userService.getUserNombre());
          console.log('Id: ' + this.userService.getUserId());
          console.log('Token: ' + this.userService.getApiKey());
          */
          this.router.navigate(['/dashboard'], {
            queryParams: { UserId: this.adminService.getUserId() },
          });
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log('Client-side error: ' + err.message);
          } else {
            console.log('Server-side error: ' + err.message);
          }
          this.msg =
            'Error al crear registro. El administrador con ese nombre ya existe.';
        }

        /*
        ({ error: { mensaje } }) => {
          if (mensaje == null) {
            this.msg =
              'Error al crear registro. El administrador con ese nombre ya existe.';
          } else {
            this.msg = mensaje;
          }
          console.log('Mensaje de error:' + this.msg);
        }
        */
      );
    }

    console.log(
      this.msg +
        'usu: ' +
        usuario +
        ' pass: ' +
        password +
        ' passreply: ' +
        passwordreplay
    );
  }

  onNotify() {
    window.alert('We notify you');
  }

  //si existe el usuario:
  //<app-usuario-alerts [usuario]="usuario" (notify)="onNotify()">
  //</app-usuario-alerts>
}
