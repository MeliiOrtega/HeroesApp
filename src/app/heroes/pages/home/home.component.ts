import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [ `.container{
    margin: 10px;
  }`
  ]
})
export class HomeComponent implements OnInit {

  nombre!:string;

  get auth(){
    return this.authSer.auth;
  }

  constructor(private router:Router, private authSer:AuthService) { }

  ngOnInit(): void {
    
  }

  logout(){
    this.router.navigate(['auth']);
  }

}
