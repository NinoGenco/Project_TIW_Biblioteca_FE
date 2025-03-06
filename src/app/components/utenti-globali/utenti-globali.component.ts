import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UtenteService} from "../../services/utente.service";
import {UtenteResponse} from "../../dtos/response/UtenteResponse";

@Component({
  selector: 'app-utenti-globali',
  templateUrl: './utenti-globali.component.html',
  styleUrl: './utenti-globali.component.css'
})
export class UtentiGlobaliComponent implements OnInit {

  protected utenti: UtenteResponse[] = [];

  constructor(private router: Router, private utenteService: UtenteService) { }

  ngOnInit(): void {
    this.utenteService.getAll().subscribe({
      next: (res: UtenteResponse[]) => {
        this.utenti = res;
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  goToChat(username: string): void {
    this.router.navigateByUrl('/chat/' + username);
  }

  goToHomepage(): void {
    this.router.navigateByUrl('/homepage');
  }
}
