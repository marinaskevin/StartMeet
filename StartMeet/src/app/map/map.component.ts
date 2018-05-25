import { Component, OnInit, ElementRef, NgZone, ViewChild } from '@angular/core';
import { HttpService } from '../http.service';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps'; 
import { MarkerLabel } from '@agm/core/services/google-maps-types';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  // Zoom level
  zoom: number;
  // Start Position
  lat: number;
  lng: number;
  // Search Details
  searchControl: FormControl;
  addr: string;
  // Markers
  markers: marker[] = [];
  my_marker: marker;
  err_list: any;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(private _httpService: HttpService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this.zoom = 14;
    this.lat = this._httpService.lat;
    this.lng = this._httpService.lng;
    this.searchControl = new FormControl();
    this._httpService.setCurrentPosition();
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.setComponentRestrictions({'country' : ['us']});
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();          

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          this.addr = place.formatted_address;
          //this.zoom = 14;
          console.log(this.addr);
          console.log(this.lat);
          console.log(this.lng);
          console.log(this.zoom);

          
        });
      });
      this.userMarker();
    });
  }

  userMarker()
  {
    var userMarker = {
      name: 'You are here',
      lat: this._httpService.lat,
      lng: this._httpService.lng,
      draggable: false
    };
    this.my_marker = userMarker;
  }

  onSelectLocation($event: any)
  {
    console.log($event.coords.lat);
    var newMarker = {
      name: '',
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    };
    this.markers.push(newMarker);
  }

  onSelectMarker(marker: marker)
  {
    console.log("Clicked Marker: "+marker.name);
  }

  markerDragEnd(marker: any, $event: any)
  {
    console.log('dragEnd',marker,$event);
  }

  addLocation(marker: any)
  {
    console.log('You named this marker '+marker.name+'!');
    console.log(marker);
    var location = {
      name: marker.name,
      latitude: marker.lat,
      longitude: marker.lng,
      id: this._httpService.user._id,
      options: {
        labelAnchor: "35 35",
      }
    };
    var observable = this._httpService.newLocation(location);
    observable.subscribe((data: any) => {
      console.log(data);
      if(data.error)
      {
        this.err_list = data.error;
      }
      else
      {
        this._router.navigate(['/locations',data.place._id]);
      }
    })
  }

}

// Market Type
interface marker{
  name?: string,
  lat: number,
  lng: number,
  draggable: boolean
}