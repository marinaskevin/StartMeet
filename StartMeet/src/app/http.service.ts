import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class HttpService implements OnInit {
  user: any = {};
  lat: number = 0;
  lng: number = 0;
  logged_in: boolean = false;
  logging_in: boolean = false;
  hover_over_logo: boolean = false;

  constructor(private _http: HttpClient) {}

  ngOnInit()
  {
    this.setCurrentPosition();
    if(navigator.geolocation)
    {
      navigator.geolocation.watchPosition(this.setCurrentPosition);
    }
    else
    {
      console.log("Geolocation is unavailable.");
    }
  }

  loginUser(user)
  {
    return this._http.post('/data/login',user);
  }

  showUser(id)
  {
    return this._http.get('/data/users/'+id);
  }

  newUser(user)
  {
    return this._http.post('/data/users',user);
  }

  newLocation(place)
  {
    return this._http.post('/data/places',place);
  }

  newEvent(event)
  {
    return this._http.post('/data/events',event);
  }

  getUsers()
  {
    return this._http.get('/data/users');
  }

  getLocations()
  {
    return this._http.get('/data/places');
  }

  getLocation(id)
  {
    return this._http.get('/data/places/'+id);
  }

  getEvents()
  {
    return this._http.get('/data/events');
  }

  getEvent(id)
  {
    return this._http.get('/data/events/'+id);
  }

  getUserEvents(id)
  {
    return this._http.get('/data/events/users/'+id);
  }  

  setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        console.log(this.lat + " " + this.lng)
      });
    }
  }

}
