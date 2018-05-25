import { Component, OnInit, ElementRef, NgZone, ViewChild } from '@angular/core';
import { HttpService } from '../http.service';
import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps'; 
import { MarkerLabel } from '@agm/core/services/google-maps-types';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  id: string;
  zoom: number;
  submitted_by: string;
  name: string;
  lat: number;
  lng: number;
  addr: string;
  location: marker;
  err_list: any;
  private sub: any;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(private _httpService: HttpService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this.sub = this._route.params.subscribe(params => {
      this.id = params['id'];
      this.getLocation();
    });
  }

  getLocation()
  {
    var observable = this._httpService.getLocation(this.id);
    observable.subscribe((data: any) => {
      console.log(data);
      if(data.error)
      {
        this.err_list = data.error;
      }
      else
      {
        this.submitted_by = data.submitted_by;
        this.name = data.name;
        this.lat = data.latitude;
        this.lng = data.longitude;
        this.initMap();
      }
    });
  }

  initMap() {
    this.zoom = 14;
    this._httpService.setCurrentPosition();
    this.mapsAPILoader.load();
    this.userMarker();
  }

  userMarker()
  {
    var locMarker = {
      name: this.name,
      lat: this.lat,
      lng: this.lng,
      draggable: false
    };
    this.location = locMarker;
  }

}

// Market Type
interface marker{
  name?: string,
  lat: number,
  lng: number,
  draggable: boolean
}