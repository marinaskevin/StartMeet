import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: String;
  password: String;
  errors: any;
  
  constructor(private _httpService: HttpService,
              private _route: ActivatedRoute,
              private _router: Router) { }

  ngOnInit() {
    this.email="";
    this.password="";
  }

  login()
  {
    var user = {
      email: this.email,
      password: this.password
    }
    var observable = this._httpService.loginUser(user);
    observable.subscribe((data: any) => {
      console.log(data);
      if(data.error)
      {
        this.errors = data.error;
      }
      else
      {
        console.log(this._httpService.user);
        this._httpService.user = data.user;
        console.log(this._httpService.user);
        this.exitLogin();
        this._httpService.logged_in = true;
      }
    });
  }

  exitLogin() {
    this._httpService.logging_in = false;
  }

}