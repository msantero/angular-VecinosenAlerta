import { Component, OnInit } from '@angular/core';

import { Administrador } from '../interfaces/administradores';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../services/administrador.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  msg: string;

  loginGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private router: Router
  ) {
    this.loginGroup = this.formBuilder.group({
      usuario: '',
      password: '',
    });
  }

  ngOnInit() {}

  login() {
    this.msg = 'Ingresando...';
    const { usuario, password } = this.loginGroup.value;
    if (!usuario || !password) {
      this.msg = 'Debe ingresar el nombre y password';
    } else {
      this.adminService.login(usuario, password).subscribe(
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
        ({ error: { mensaje } }) => {
          this.msg = mensaje;
          console.log('Mensaje de error:' + this.msg);
        }
      );
    }

    console.log(this.msg + '  usu: ' + usuario + ' pass: ' + password);
  }

  onNotify() {
    window.alert('We notify you');
  }

  //si existe el usuario:
  //<app-usuario-alerts [usuario]="usuario" (notify)="onNotify()">
  //</app-usuario-alerts>
}
