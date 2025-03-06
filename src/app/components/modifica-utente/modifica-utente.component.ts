import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UtenteService} from "../../services/utente.service";
import {MessaggioResponse} from "../../dtos/response/MessaggioResponse";
import {HttpErrorResponse} from "@angular/common/http";
import {GenereService} from "../../services/genere.service";
import {GenereResponse} from "../../dtos/response/GenereResponse";

@Component({
  selector: 'app-modifica-utente',
  templateUrl: './modifica-utente.component.html',
  styleUrl: './modifica-utente.component.css'
})
export class ModificaUtenteComponent implements OnInit {

  protected username: string = '';
  protected nome: string = '';
  protected email: string = '';
  protected telefono: string = '';
  protected vecchiaPassword: string = '';
  protected nuovaPassword: string = '';
  protected comunita: string = '';
  protected isNotifica: boolean = false;
  protected generi: GenereResponse[] = [];
  protected generiSelezionati: string[] = [];

  constructor(private utenteService: UtenteService, private router: Router, private genereService: GenereService) { }

  ngOnInit() {
    this.utenteService.get().subscribe({
      next: (res: any) => {
        this.username = res.username;
        this.nome = res.nome;
        this.email = res.email;
        this.telefono = res.telefono;
        this.comunita = res.comunita;
        this.isNotifica = res.notifica;
        this.generiSelezionati = res.generiSelezionati;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    });
    this.genereService.getAll().subscribe({
      next: (res: GenereResponse[]) => {
        this.generi = res;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    });
  }

  modifica(): void {
    this.utenteService.modifica({username: this.username, nome: this.nome, email: this.email, telefono: this.telefono,
      vecchiaPassword: this.vecchiaPassword, nuovaPassword: this.nuovaPassword, comunita: this.comunita,
    isNotifica: this.isNotifica, generiSelezionati: this.generiSelezionati}).subscribe({
      next: (res: MessaggioResponse) => {
        this.router.navigateByUrl('/login');
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    });
  }

  toggleGenere(genere: string): void {
    if (this.generiSelezionati.includes(genere)) {
      this.generiSelezionati = this.generiSelezionati.filter(g => g !== genere);
    } else {
      this.generiSelezionati.push(genere);
    }
  }

  goToHomepage(): void {
    this.router.navigateByUrl('/homepage');
  }
}
