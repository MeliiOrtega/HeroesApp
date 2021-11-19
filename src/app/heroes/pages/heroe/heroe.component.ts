import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroes } from '../../interfaces/heroes.interface';
import { switchMap } from 'rxjs/operators';
import { HeroesService } from '../../services/heroes.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [ `
  img{
    width: 100%;
    border-radius: 10px;
  }
  `
  ]
})
export class HeroeComponent implements OnInit {

  heroe!:Heroes;
  id!:string;

  constructor(private routeAct: ActivatedRoute, private heroeSer:HeroesService, private routes: Router) { }

  ngOnInit(): void {
    this.routeAct.params
    .pipe(switchMap( ({id}) => this.heroeSer.getHeroe(id)))
    .subscribe( heroe => this.heroe = heroe);

    /* this.routeAct.params.subscribe(({id}) => this.id = id);
    this.heroeSer.getHeroe(this.id).subscribe(heroe => this.heroe = heroe); */
  }

  regresar(){
    this.routes.navigate(['/heroes/listado']);
  }
}
