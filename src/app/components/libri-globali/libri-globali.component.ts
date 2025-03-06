import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {LibroService} from "../../services/libro.service";
import {LibroResponse} from "../../dtos/response/LibroResponse";
import {HttpErrorResponse} from "@angular/common/http";
import {GenereResponse} from "../../dtos/response/GenereResponse";
import {GenereService} from "../../services/genere.service";
import {ScambioService} from "../../services/scambio.service";
import {query} from "@angular/animations";
import {MessaggioResponse} from "../../dtos/response/MessaggioResponse";

@Component({
  selector: 'app-libri-globali',
  templateUrl: './libri-globali.component.html',
  styleUrl: './libri-globali.component.css'
})
export class LibriGlobaliComponent implements OnInit {

  protected ricercaGenere: string = '';
  protected ricercaTitolo: string = '';
  protected ricercaAutore: string = '';
  protected generi: GenereResponse[] = [];
  protected libri: LibroResponse[] = [];

  constructor(private router: Router, private genereService: GenereService, private libroService: LibroService) { }

  ngOnInit(): void {
    this.libroService.getAll().subscribe({
      next: (response: LibroResponse[]) => {
        this.libri = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
    this.genereService.getAll().subscribe({
      next: (res: GenereResponse[]) => {
        this.generi = res;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }

  goToRichiedi(id: number): void {
    this.router.navigateByUrl('/richiesta/' + id.toString());
  }

  resetFiltri(): void {
    this.ricercaGenere = '';
    this.ricercaTitolo = '';
    this.ricercaAutore = '';
  }

  goToHomepage(): void {
    this.router.navigateByUrl('/homepage');
  }
}
