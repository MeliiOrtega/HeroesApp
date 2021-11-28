import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthModule } from '../../auth.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  constructor(private router:Router, private authSer: AuthService) { }

  ngOnInit(): void {
  }

  login(){

    this.authSer.login().subscribe( resp => {
      if(resp.id){
        this.router.navigate(['heroes']);
      }
    });



  }

}
