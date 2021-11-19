import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroes } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {
  termino:string = "";
  heroes:Heroes[] = [];
  heroeSeleccionado!:Heroes | undefined;

  constructor(private heroeSer: HeroesService) { }

  ngOnInit(): void {
    //this.heroeSer.getHeroes().subscribe((heroe) => this.heroes = heroe);
  }

  buscando(){
    this.heroeSer.getSugerencia(this.termino.trim()).subscribe(heroes => this.heroes = heroes);
    
    console.log(this.heroes);
    
  }

  opcionSeleccionada(event:MatAutocompleteSelectedEvent){
    console.log(event);
    
    if (this.heroes.length === 0 || !event.option.value) {
      this.heroeSeleccionado = undefined;
        return;
    }else{
    const h = event.option.value;
    this.termino = h.superhero;
    this.heroeSer.getHeroe(h.id).subscribe( heroe => this.heroeSeleccionado = heroe);
    console.log(this.termino)
    }
  }

}
