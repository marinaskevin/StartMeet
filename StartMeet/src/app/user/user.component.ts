import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: any;
  err_list: any;
  id: number;
  other_user: boolean;
  events: any;
  private sub: any;

  constructor(private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router) { }

    ngOnInit() {
      this.sub = this._route.params.subscribe(params => {
        this.id = params['id'];
        this.getUser();
        this.getUserEvents();
      });
    }
  
  getUser()
  {
    var observable = this._httpService.showUser(this.id);
    observable.subscribe((data: any) => {
      console.log(data);
      if(data.error)
      {
        this.err_list = data.error;
      }
      else
      {
        this.user = data;
      }
    });
  }

  getUserEvents()
  {
    var observable = this._httpService.getUserEvents(this.id);
    observable.subscribe((data: any) => {
      console.log(data);
      if(data.error)
      {
        this.err_list = data.error;
      }
      else
      {
        this.events = data;
      }
    });
  }

  likeUser()
  {
    
  }

  followUser()
  {

  }

  shareLocation()
  {

  }  

}