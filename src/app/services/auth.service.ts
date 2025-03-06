import { Injectable } from '@angular/core';
import {globalBackendUrl} from "../utils/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoginResponse} from "../dtos/response/LoginResponse";
import {LoginRequest} from "../dtos/request/LoginRequest";
import {RegisterRequest} from "../dtos/request/RegisterRequest";
import {MessaggioResponse} from "../dtos/response/MessaggioResponse";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private backendUrl: string = globalBackendUrl + 'auth/';

  constructor(private http: HttpClient) { }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.backendUrl + 'login', request);
  }

  register(request: RegisterRequest): Observable<MessaggioResponse> {
    return this.http.post<MessaggioResponse>(this.backendUrl + 'register', request);
  }
}
