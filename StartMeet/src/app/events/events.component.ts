import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  id: string;
  events: any;
  err_list: any;
  private sub: any;

  constructor(private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router) { }

    ngOnInit() {
      this.sub = this._route.params.subscribe(params => {
        this.id = params['id'];
        this.getEvents();
      });
    }
  
  getEvents()
  {
    var observable = this._httpService.getEvents();
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
}
