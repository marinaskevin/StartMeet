import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css']
})
export class NewEventComponent implements OnInit {
  id_type: string = "Manual";
  name: string = "";
  description: string = "";
  location: string = "";
  start_time: string = "";
  end_time: string = "";
  err_list: any;
  locations: any;
  
  constructor(private _httpService: HttpService,
              private _route: ActivatedRoute,
              private _router: Router) { }

  ngOnInit() {
    this.getLocations();
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

  register()
  {
    if(this._httpService.logged_in)
    {
      var event = {
        name: this.name,
        description: this.description,
        location: this.location,
        start_time: this.start_time,
        end_time: this.end_time,
        id: this._httpService.user._id
      };
      console.log(event);
      var observable = this._httpService.newEvent(event);
      observable.subscribe((data: any) => {
        console.log(data);
        if(data.error)
        {
          this.err_list = data.error;
        }
        else
        {
          this._router.navigate(['/events',data.event._id]);
        }
      });
    }
    else
    {
      this._httpService.logging_in = true; 
    }
  }

}