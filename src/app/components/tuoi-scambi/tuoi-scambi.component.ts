import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ScambioService} from "../../services/scambio.service";
import {HttpErrorResponse} from "@angular/common/http";
import {OffertaResponse} from "../../dtos/response/OffertaResponse";

@Component({
  selector: 'app-tuoi-scambi',
  templateUrl: './tuoi-scambi.component.html',
  styleUrl: './tuoi-scambi.component.css'
})
export class TuoiScambiComponent implements OnInit {

  protected ricercaTitolo: string = '';
  protected ricercaAutore: string = '';
  protected offerte: OffertaResponse[] = [];

  constructor(private router: Router, private scambioService: ScambioService) { }

  ngOnInit(): void {
    this.scambioService.getPropriScambi().subscribe({
      next: (response: OffertaResponse[]) => {
        this.offerte = response;
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
