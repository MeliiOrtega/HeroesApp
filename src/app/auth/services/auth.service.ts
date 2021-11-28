import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from '../interfaces/usuarios.interface';
import { map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:string = environment.baseUrl;
  private _auth: Auth | undefined;

  get auth(){
    return {...this._auth!};
  }

  constructor(private http:HttpClient) { }


  verificaAutentificacion():Observable<boolean>{
    if(!localStorage.getItem('id')){
      return of(false);
    }

    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`).pipe(
      map( auth => {
        this._auth = auth; return true})
    )
  }

  login(){
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`).pipe(
      tap(resp => this._auth = resp),
      tap(resp => localStorage.setItem('id', resp.id))
    );
  }

  logout(){
    this._auth = undefined;
  }
}
