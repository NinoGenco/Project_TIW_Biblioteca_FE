import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {LibroService} from "../../services/libro.service";
import {LibroResponse} from "../../dtos/response/LibroResponse";
import {HttpErrorResponse} from "@angular/common/http";
import {GenereResponse} from "../../dtos/response/GenereResponse";
import {GenereService} from "../../services/genere.service";

@Component({
  selector: 'app-propri-libri',
  templateUrl: './propri-libri.component.html',
  styleUrl: './propri-libri.component.css'
})
export class PropriLibriComponent implements OnInit {

  protected ricercaGenere: string = '';
  protected ricercaTitolo: string = '';
  protected ricercaAutore: string = '';
  protected generi: GenereResponse[] = [];
  protected libri: LibroResponse[] = [];

  constructor(private router: Router, private libroService: LibroService, private genereService: GenereService) { }

  ngOnInit(): void {
    this.libroService.getByProprietario().subscribe({
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

  resetFiltri(): void {
    this.ricercaGenere = '';
    this.ricercaTitolo = '';
    this.ricercaAutore = '';
  }

  offri(libroId: number): void {
    this.router.navigateByUrl('/offerta/' + libroId);
  }

  goToHomepage(): void {
    this.router.navigateByUrl('/homepage');
  }
}
