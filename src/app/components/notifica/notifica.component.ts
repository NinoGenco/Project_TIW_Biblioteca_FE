import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {NotificaService} from "../../services/notifica.service";
import { NotificaResponse } from '../../dtos/response/NotificaResponse';
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-notifica',
  templateUrl: './notifica.component.html',
  styleUrl: './notifica.component.css'
})
export class NotificaComponent implements OnInit {

  protected notifiche: NotificaResponse[] = [];

  constructor(private router: Router, private notificaService: NotificaService) { }

  ngOnInit(): void {
    this.notificaService.getByUtente().subscribe({
      next: (response: NotificaResponse[]) => {
        response.forEach((notifica: any) => {
          this.notifiche.push({ data: new Date(notifica.data).toLocaleString(), testo: notifica.testo });
        });
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }

  goToHomepage(): void {
    this.router.navigateByUrl('/homepage');
  }
}
