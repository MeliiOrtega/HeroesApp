import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authSer:AuthService, private route:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.authSer.verificaAutentificacion().pipe(
        tap(estaAutenticado => {
          if(!estaAutenticado){
            this.route.navigate(['./auth/login']);
          }
        })
      );

      /* if(this.authSer.auth.id){
        return true;
      }
    console.log('Bloqueado por CanActivate');
    return false; */
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      console.log('Bloqueado por CanLoad');
      return this.authSer.verificaAutentificacion().pipe(
        tap(estaAutenticado => {
          if(!estaAutenticado){
            this.route.navigate(['./auth/login']);
          }
        })
      );
      /* console.log(route);
      console.log(segments);
      if(this.authSer.auth.id){
        return true;
      }
      console.log('Bloqueado por CanLoad');
    return false; */
  }
}
