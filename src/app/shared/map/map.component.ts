declare var google: any;

import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

/**
 * Interacts with the Google Maps API
 */
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  private map;
  private markers = [];

  constructor(private http: HttpClient) {}

  /**
   * Loads map and adds bus position to the map
   * @method ngOnInit
   */
  ngOnInit() {
    this.loadMap();

    // Make the HTTP request:
    this.http.get('http://api.translink.ca/rttiapi/v1/buses?apikey=lgY0ai1TacjmF9rJzlUn')
      .subscribe(data => this.loadMarkers(data));

  }

  /**
   * Takes a TransLink response object and adds marker to the map
   * @method loadMarkers
   * @param  data TransLink response object
   */
  private loadMarkers(data) {
    var buses: Bus[] = data;

    //Loop through all the markers and remove
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null);
    }
    this.markers = [];

    buses.forEach(bus => {
      //We have specific style for each bus type
      switch(bus.RouteNo) {
        case '099':
        var marker = new google.maps.Marker({
            position: {lat: bus.Latitude, lng: bus.Longitude},
            map: this.map,
            label: {
              text: '99' + (bus.Direction == 'WEST' ? 'W' : 'E'),
              fontFamily: 'Roboto Condensed',
              fontSize: '9px'
            },
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 9,
              fillColor: "#50BB00",
              fillOpacity: 1,
              strokeWeight: 0.4
            }
          });
        this.markers.push(marker);
        break;
        case '014':
        var marker = new google.maps.Marker({
            position: {lat: bus.Latitude, lng: bus.Longitude},
            map: this.map,
            label: {
              text: '14' + (bus.Direction == 'WEST' ? 'W' : 'E'),
              fontFamily: 'Roboto Condensed',
              fontSize: '9px'
            },
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 9,
              fillColor: "#FF9933",
              fillOpacity: 1,
              strokeWeight: 0.4
            }
          });
        this.markers.push(marker);
        break;
        case '004':
        var marker = new google.maps.Marker({
            position: {lat: bus.Latitude, lng: bus.Longitude},
            map: this.map,
            label: {
              text: '4' + (bus.Direction == 'WEST' ? 'W' : 'E'),
              fontFamily: 'Roboto Condensed',
              fontSize: '9px'
            },
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 9,
              fillColor: "#003399",
              fillOpacity: 1,
              strokeWeight: 0.4
            }
          });
        this.markers.push(marker);
        break;
        case '025':
        var marker = new google.maps.Marker({
            position: {lat: bus.Latitude, lng: bus.Longitude},
            map: this.map,
            label: {
              text: '25' + (bus.Direction == 'WEST' ? 'W' : 'E'),
              fontFamily: 'Roboto Condensed',
              fontSize: '9px'
            },
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 9,
              fillColor: "#CB2028",
              fillOpacity: 1,
              strokeWeight: 0.4
            }
          });
        this.markers.push(marker);
        break;
        case 'N17':
        var marker = new google.maps.Marker({
            position: {lat: bus.Latitude, lng: bus.Longitude},
            map: this.map,
            label: {
              text: 'N17' + (bus.Direction == 'WEST' ? 'W' : 'E'),
              fontFamily: 'Roboto Condensed',
              fontSize: '9px'
            },
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 9,
              fillColor: "#060610",
              fillOpacity: 1,
              strokeWeight: 0.4
            }
          });
        this.markers.push(marker);
        break;
        case '084':
        var marker = new google.maps.Marker({
            position: {lat: bus.Latitude, lng: bus.Longitude},
            map: this.map,
            label: {
              text: '84' + (bus.Direction == 'WEST' ? 'W' : 'E'),
              fontFamily: 'Roboto Condensed',
              fontSize: '9px'
            },
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 9,
              fillColor: "#FE5E00",
              fillOpacity: 1,
              strokeWeight: 0.4
            }
          });
        this.markers.push(marker);
        break;
      }
    })

    setTimeout(() => {
      // Make the HTTP request:
      this.http.get('http://api.translink.ca/rttiapi/v1/buses?apikey=lgY0ai1TacjmF9rJzlUn')
        .subscribe(data => this.loadMarkers(data));
    }, 60000);
  }

  /**
   * Load Google Maps into div and loads style information
   * @method loadMap
   */
  private loadMap() {
    var mapProp = {
            center: new google.maps.LatLng(49.2517379, -123.1635757),
            zoom: 13,
            disableDefaultUI: true,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#6699cc"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "lightness": 20
      },
      {
        "gamma": 0.01
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "saturation": -31
      },
      {
        "lightness": -33
      },
      {
        "gamma": 0.8
      },
      {
        "weight": 2
      }
    ]
  },
  {
    "featureType": "administrative",
    "stylers": [
      {
        "hue": "#37ff00"
      },
      {
        "visibility": "simplified"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.neighborhood",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.province",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "landscape",
    "stylers": [
      {
        "lightness": 60
      }
    ]
  },
  {
    "featureType": "landscape",
    "elementType": "geometry",
    "stylers": [
      {
        "saturation": 30
      },
      {
        "lightness": 30
      }
    ]
  },
  {
    "featureType": "poi",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "saturation": 20
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "saturation": -20
      },
      {
        "lightness": 20
      }
    ]
  },
  {
    "featureType": "road",
    "stylers": [
      {
        "hue": "#0080ff"
      },
      {
        "visibility": "simplified"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "saturation": -30
      },
      {
        "lightness": 10
      },
      {
        "visibility": "simplified"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "saturation": 25
      },
      {
        "lightness": 25
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "water",
    "stylers": [
      {
        "lightness": -20
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  }
],
        };
    this.map = new google.maps.Map(document.getElementById("map"), mapProp);
  }

}

/**
 * Interface to describe a single bus
 */
interface Bus {
  Destination: string;
  Direction: 'NORTH' | 'EAST' | 'WEST' | 'SOUTH';
  Latitude: number;
  Longitude: number;
  Pattern: string;
  RouteNo: string;
  RecordedTime: string;
  RouteMap: {
    Href: string;
  }
  TripId: number;
  VehicleNo: string;
}
