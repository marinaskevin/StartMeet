import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: String;

  constructor(private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this.title = "StartMeet";
    this.goHome();
    this._httpService.setCurrentPosition();
  }

  goHome() {
    this._router.navigate(['/home']);
  }

  logIn() {
    this._httpService.logging_in = true;
  }

  exitLogin() {
    this._httpService.logging_in = false;
  }

  onHover()
  {
    this._httpService.hover_over_logo = true
  }

  logOut() {
    this._httpService.user = {};
    this._httpService.logged_in = false;
    this.goHome();
  }

}