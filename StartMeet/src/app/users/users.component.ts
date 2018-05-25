import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any;
  err_list: any;
  
  constructor(private _httpService: HttpService,
              private _route: ActivatedRoute,
              private _router: Router) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers()
  {
    var observable = this._httpService.getUsers();
    observable.subscribe((data: any) => {
      console.log(data);
      if(data.error)
      {
        this.err_list = data.error;
      }
      else
      {
        this.users = data;
      }
    });
  }

}