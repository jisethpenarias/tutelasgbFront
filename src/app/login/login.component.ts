import { Component, OnInit } from '@angular/core';
import {LoginService} from '../services/login.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Login} from '../models/login';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {LocalstorageService} from '../services/localstorage.service';
import {LoginExitoso} from '../models/loginExitoso';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFormGroup = new FormGroup(
    {
      usernameValidacion: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      passwordValidacion: new FormControl('',[Validators.required, Validators.maxLength(20)])
    }
  );

  login: Login = {username: '', password: ''};

  constructor(private loginService: LoginService,
              public _snackbar: MatSnackBar,
              private router: Router,
              private localstorageService: LocalstorageService) { }

  ngOnInit(): void {
  }

  submit(){
    if (this.loginFormGroup.invalid) {
      return;
    }

    this.loginService.login(this.login).subscribe(
      (response: LoginExitoso) => {
        this.localstorageService.usuarioLogueado = response;
        this.login = {username: '', password: ''};
        this.router.navigate(['']);
        this._snackbar.open('Login exitoso', 'Ok', {duration: 2000});
      },
      (error) => {
        this._snackbar.open(error.errors.message, 'Ok');
      }
    );
  }

  getErrorMessage(propiedad: string, error: string) {
    if (error === 'required') {
      return 'Debe introducir la infomación requerida';
    }

    if (propiedad === 'username' && error === 'max') {
      return 'El nombre de usuario no puede exceder los 20 caracteres';
    }

    if (propiedad === 'password' && error === 'max') {
      return 'El password no puede exceder los 20 caracteres';
    }

    return '';
  }
}
