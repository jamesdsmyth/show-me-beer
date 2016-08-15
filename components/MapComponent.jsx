import React, { PropTypes } from 'react'
import leaflet from 'leaflet'
import { Link } from 'react-router'

class MapComponent extends React.Component {

    componentDidMount () {
        this.createMap();
        this.setLocationMarkers();
    }

    componentWillReceiveProps () {
        this.clearMap();
        this.setLocationMarkers();
    }

    createMap () {
        this.mymap = L.map('mapid');
        this.setTileLayer();
    }

    clearMap () {
        if(this.mymap != null) {
            this.mymap.eachLayer(function (layer) {
                this.mymap.removeLayer(layer);
            }.bind(this));

            this.setTileLayer();
        }
    }

    setTileLayer () {
        return L.tileLayer('https://api.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiamFtZXNkc215dGgiLCJhIjoiY2lvaXFlejRoMDA2eHV1a3gwMWJyOThiYSJ9.ZHj4u050E2Ta_YiWyRnOxA', {
            maxZoom: 18
        }).addTo(this.mymap);
    }

    setLocationMarkers () {

        var locations = this.props.locations;

        var LeafIcon = L.Icon.extend({
            options: {
                iconSize:     [41, 60], // size of the icon
                iconAnchor:   [21, 60],
                popupAnchor:  [-1, -40]
            }
        });

        var markerIcon = new LeafIcon({iconUrl: '../images/pin.png'})

        L.icon = function (options) {
            return new L.Icon(options);
        };

        if(locations.longitude != null) {
            L.marker([locations.longitude, locations.latitude],
                {
                    icon: markerIcon
                }
            ).addTo(this.mymap)

            this.mymap.setView([locations.longitude, locations.latitude], 15);

        } else {
            for(var location in locations) {

                L.marker([locations[location].coords.longitude, locations[location].coords.latitude],
                    {
                        icon: markerIcon
                    }
                ).addTo(this.mymap).bindPopup('<a href="/locations/' + location + '">' + locations[location].name +'</a>');
            }

            this.mymap.setView([51.505, -0.09], 12);
        }
    }

    render () {
        return (
            <div id="mapid"></div>
        )
    }
}

export default MapComponent
