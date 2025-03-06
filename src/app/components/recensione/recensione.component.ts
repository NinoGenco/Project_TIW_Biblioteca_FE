import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {RecensioneService} from "../../services/recensione.service";
import {MessaggioResponse} from "../../dtos/response/MessaggioResponse";
import {HttpErrorResponse} from "@angular/common/http";
import {RecensioneResponse} from "../../dtos/response/RecensioneResponse";

@Component({
  selector: 'app-recensione',
  templateUrl: './recensione.component.html',
  styleUrl: './recensione.component.css'
})
export class RecensioneComponent implements OnInit {

  protected testo: string = '';
  protected voto: number = 0;
  protected recensioni: RecensioneResponse[] = [];

  constructor(private router: Router, private recensioneService: RecensioneService) { }

  ngOnInit(): void {
    this.recensioneService.getByScambio(this.router.url.split('/')[2]).subscribe({
      next: (res: RecensioneResponse[]) => {
        this.recensioni = res;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }

  inviaRecensione(): void {
    this.recensioneService.invia({testo: this.testo, voto: this.voto,
    userId: Number(localStorage.getItem('userId')) || 0, scambioId: Number(this.router.url.split('/')[2])})
      .subscribe({
      next: (res: MessaggioResponse) => {
        this.goToHomepage();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }

  giaRecensito(): boolean {
    return this.recensioni.some(r => r.usernameUtente === localStorage.getItem('username'));
  }

  reset(): void {
    this.testo = '';
    this.voto = 0;
  }

  goToHomepage(): void {
    this.router.navigateByUrl('/homepage');
  }
}
