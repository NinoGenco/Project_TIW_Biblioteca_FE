import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {LoginResponse} from "../../dtos/response/LoginResponse";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  protected username: string = '';
  protected password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.login({username: this.username, password: this.password}).subscribe({
      next: (res: LoginResponse) => {
        localStorage.setItem('userId', res.userId.toString());
        localStorage.setItem('username', res.username);
        localStorage.setItem('nome', res.nome);
        localStorage.setItem('email', res.email);
        localStorage.setItem('telefono', res.telefono);
        localStorage.setItem('comunita', res.comunita);
        localStorage.setItem('notifica', res.notifica.toString());
        localStorage.setItem('ruolo', res.ruolo);
        localStorage.setItem('jwt', "Bearer " + res.jwt);
        this.router.navigateByUrl('/homepage');
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    });
  }

  goToRegister() {
    this.router.navigateByUrl('/register');
  }
}
