import { Component, OnInit } from '@angular/core';
import { Heroes, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [` img{ width:100%; border-radius: 40px;}`
  ]
})
export class AgregarComponent implements OnInit {

  publisher = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'

    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'

    },

  ];

  heroe:Heroes = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher:Publisher.DCComics,
    alt_img: ''
  }

  constructor(private heroeSer:HeroesService, private routeAc:ActivatedRoute, private route:Router) { }

  ngOnInit(): void {
    if(!this.route.url.includes('editar')){
      return;
    }
    this.routeAc.params.pipe(switchMap(({id}) => this.heroeSer.getHeroe(id))).subscribe(heroe => this.heroe = heroe);
  }

  guardar(){
    if (this.heroe.superhero.trim().length === 0) {
      return;
    }
    if (this.heroe.id) {
      this.heroeSer.actualizarHeroe(this.heroe).subscribe( heroe => this.heroe = heroe);
    }else{
      this.heroeSer.agregarHeroe(this.heroe).subscribe( heroe => this.route.navigate(['/heroes/editar',heroe.id]));
      console.log(this.heroe.alt_img);
    }

    console.log(this.heroe.alt_img);
  }

  eliminar(){
    this.heroeSer.eliminarHeroe(this.heroe.id!).subscribe(heroe => this.route.navigate(['/heroes']));
  }
}
