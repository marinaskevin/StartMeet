import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {
  id: string;
  locations: any;
  err_list: any;
  private sub: any;

  constructor(private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router) { }

    ngOnInit() {
      this.sub = this._route.params.subscribe(params => {
        this.id = params['id'];
        this.getLocations();
      });
    }
  
  getLocations()
  {
    var observable = this._httpService.getLocations();
    observable.subscribe((data: any) => {
      console.log(data);
      if(data.error)
      {
        this.err_list = data.error;
      }
      else
      {
        this.locations = data;
      }
    });
  }
}
