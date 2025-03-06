import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ScambioService} from "../../services/scambio.service";
import {HttpErrorResponse} from "@angular/common/http";
import {OffertaResponse} from "../../dtos/response/OffertaResponse";
import {MessaggioResponse} from "../../dtos/response/MessaggioResponse";

@Component({
  selector: 'app-proprie-richieste',
  templateUrl: './proprie-richieste.component.html',
  styleUrl: './proprie-richieste.component.css'
})
export class ProprieRichiesteComponent implements OnInit {

  protected ricercaTitolo: string = '';
  protected ricercaAutore: string = '';
  protected richieste: OffertaResponse[] = [];

  constructor(private router: Router, private scambioService: ScambioService) { }

  ngOnInit(): void {
    this.scambioService.getProprieRichieste().subscribe({
      next: (response: OffertaResponse[]) => {
        this.richieste = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }

  accetta(scambioId: number): void {
    this.scambioService.accettaRichiesta(scambioId).subscribe({
      next: (response: MessaggioResponse) => {
        this.router.navigateByUrl('/homepage');
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }

  rifiuta(scambioId: number): void {
    this.scambioService.rifiutaRichiesta(scambioId).subscribe({
      next: (response: MessaggioResponse) => {
        this.router.navigateByUrl('/homepage');
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }

  resetFiltri(): void {
    this.ricercaTitolo = '';
    this.ricercaAutore = '';
  }

  goToHomepage(): void {
    this.router.navigateByUrl('/homepage');
  }
}
