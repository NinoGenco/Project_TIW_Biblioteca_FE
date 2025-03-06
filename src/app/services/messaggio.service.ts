import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {globalBackendUrl} from "../utils/environment";

@Injectable({
  providedIn: 'root'
})
export class MessaggioService {

  private backendUrl: string = globalBackendUrl + 'messaggio/';

  constructor(private http: HttpClient) { }

  getMessaggi(mittenteId: string, usernameDestinatario: string): Observable<any> {
    const header = this.getHeader();
    return this.http.post(this.backendUrl + 'get', { mittenteId, usernameDestinatario }, { headers: header });
  }

  inviaMessaggio(messaggio: string, mittenteId: string, usernameDestinatario: string): Observable<any> {
    const header = this.getHeader();
    const request = { messaggio, mittenteId, usernameDestinatario };

    return this.http.post(this.backendUrl + 'invia', request, { headers: header });
  }

  private getHeader(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': localStorage.getItem('jwt') ? `${localStorage.getItem('jwt')}` : '',
      id: localStorage.getItem('userId') ? `${localStorage.getItem('userId')}` : '',
      ruolo: localStorage.getItem('ruolo') ? `${localStorage.getItem('ruolo')}` : ''
    });
  }
}
