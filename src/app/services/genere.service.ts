import { Injectable } from '@angular/core';
import {globalBackendUrl} from "../utils/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {GenereResponse} from "../dtos/response/GenereResponse";

@Injectable({
  providedIn: 'root'
})
export class GenereService {

  private backendUrl: string = globalBackendUrl + 'genere/';

  constructor(private http: HttpClient) { }

  getAll(): Observable<GenereResponse[]> {
    return this.http.get<GenereResponse[]>(this.backendUrl + 'getAll', {headers: this.getHeader()});
  }

  private getHeader(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': localStorage.getItem('jwt') ? `${localStorage.getItem('jwt')}` : '',
      id: localStorage.getItem('userId') ? `${localStorage.getItem('userId')}` : '',
      ruolo: localStorage.getItem('ruolo') ? `${localStorage.getItem('ruolo')}` : ''
    });
  }
}
