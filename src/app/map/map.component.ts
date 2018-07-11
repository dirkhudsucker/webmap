
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { icon, latLng, marker, tileLayer } from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  //Layers
  LAYER_OCM = {

		id: 'opencyclemap',

		name: 'Open Cycle Map',

		enabled: true,

		layer: tileLayer('http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', {

			maxZoom: 18,

			attribution: 'Open Cycle Map'

		})

	};
	LAYER_OSM = {

		id: 'openstreetmap',

		name: 'Open Street Map',

		enabled: false,

		layer: tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {

			maxZoom: 18,

			attribution: 'Open Street Map'

		})

	};



	// Values to bind to Leaflet Directive

	layersControlOptions = { position: 'bottomright' };

	baseLayers = {

		'Open Street Map': this.LAYER_OSM.layer,

		'Open Cycle Map': this.LAYER_OCM.layer

	};

	options = {
		zoom: 10,
    center:latLng(46.879966, -121.726909)
	
  };
  layersControl = {
    baseLayers: this.baseLayers,
    overlays: {
    }
  };
  SearchLocation="Richmond";
  FoundLocation:Object;
  Zoom=this.options.zoom;
  Lat=this.options.center.lat;
  Long=this.options.center.lng;
  constructor(private _http:HttpClient) { }

  ZoomTo() :void{
  this.options.zoom=this.Zoom;
  }
  PanTo() :void{
    this.options.center=latLng(this.Lat,this.Long);
    }
  search() :void{
    this._http.get(`http://dev.virtualearth.net/REST/v1/Locations/US/${this.SearchLocation}?key=AoM2ICOKcALZ_0d23UAqfY1iPtHldvCtIdMNOImk--jWnkfJLaDWXTFzwl984EBo`)
    .subscribe(data=>{this.FoundLocation=data['resourceSets'][0]['resources'];
  console.log(this.FoundLocation);}
  );
  }
  setMarker(lat,long):void{
    let Marker = marker([ lat, long ], {
      icon: icon({
        iconSize: [ 25, 41 ],
        iconAnchor: [ 13, 41 ],
        iconUrl: './assets/marker-icon.png',
        shadowUrl: './assets/marker-shadow.png'
      })
    });
    this.layersControl.overlays={
      'current marker':Marker
    }
    this.options.center=latLng(lat,long);

  }
  ngOnInit() {
    
  }

}
