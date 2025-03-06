import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ScambioService} from "../../services/scambio.service";
import {HttpErrorResponse} from "@angular/common/http";
import {OffertaResponse} from "../../dtos/response/OffertaResponse";

@Component({
  selector: 'app-offerte-concluse',
  templateUrl: './offerte-concluse.component.html',
  styleUrl: './offerte-concluse.component.css'
})
export class OfferteConcluseComponent implements OnInit {

  protected ricercaTitolo: string = '';
  protected ricercaAutore: string = '';
  protected offerte: OffertaResponse[] = [];

  constructor(private router: Router, private scambioService: ScambioService) { }

  ngOnInit(): void {
    this.scambioService.getOfferteConcluse().subscribe({
      next: (response: OffertaResponse[]) => {
        this.offerte = response;
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
      }
    });
  }

  goToRecensione(scambioId: number): void {
    this.router.navigateByUrl('/recensione/' + scambioId.toString());
  }

  resetFiltri(): void {
    this.ricercaTitolo = '';
    this.ricercaAutore = '';
  }

  goToHomepage(): void {
    this.router.navigateByUrl('/homepage');
  }
}
