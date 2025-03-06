import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {MessaggioResponse} from "../../dtos/response/MessaggioResponse";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  protected username: string = '';
  protected nome: string = '';
  protected email: string = '';
  protected telefono: string = '';
  protected password: string = '';
  protected comunita: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  register() {
    this.authService.register({username: this.username, nome: this.nome, email: this.email,
      telefono: this.telefono, password: this.password, comunita: this.comunita}).subscribe({
      next: (res: MessaggioResponse) => {
        this.router.navigateByUrl('/login');
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    });
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
  }
}
