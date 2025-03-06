import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MessaggioService} from "../../services/messaggio.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {

  username: string = this.router.url.split('/')[2];
  messaggio: string = '';
  messaggi: any[] = [];

  constructor(private router: Router, private messaggioService: MessaggioService) { }

  ngOnInit(): void {
    this.messaggioService.getMessaggi(localStorage.getItem('userId') || '', this.username).subscribe({
      next: (result: any) => {
        this.messaggi = result;
        result.forEach((item: any) => {
          item.dataInvio = new Date(item.dataInvio).toLocaleString();
        });
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  inviaMessaggio(): void {
    this.messaggioService.inviaMessaggio(this.messaggio, localStorage.getItem('userId') || '', this.username).subscribe({
      next: (result: any) => {
        result.dataInvio = new Date(result.dataInvio).toLocaleString();
        this.messaggi.push(result);
        this.messaggio = '';
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  goToHomepage(): void {
    this.router.navigateByUrl('/homepage');
  }
}
