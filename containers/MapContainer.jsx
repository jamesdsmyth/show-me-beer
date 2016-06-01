import React, { PropTypes } from 'react'
import leaflet from 'leaflet'
import { Link } from 'react-router'

class MapContainer extends React.Component {

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

        console.log('new locations are', locations);
        var LeafIcon = L.Icon.extend({
            options: {
                iconUrl: '../node_modules/leaflet/dist/images/marker-icon.png',
                iconSize:     [38, 95], // size of the icon
                iconAnchor:   [22, 94],
                popupAnchor:  [-15, -46]
            }
        });

        var markerIcon = new LeafIcon({iconUrl: '../node_modules/leaflet/dist/images/marker-icon.png'})

        L.icon = function (options) {
            return new L.Icon(options);
        };

        if(locations.longitude != null) {
            L.marker([locations.longitude, locations.latitude],
                {
                    icon: markerIcon
                }
            ).addTo(this.mymap)

            this.mymap.setView([locations.longitude, locations.latitude], 13);

        } else {
            for(var key in locations) {
                L.marker([locations[key].coords.longitude, locations[key].coords.latitude],
                    {
                        icon: markerIcon
                    }
                ).addTo(this.mymap).bindPopup('<a href="/locations/' + key + '">' + key +'</a>');
            }

            this.mymap.setView([51.505, -0.09], 8);
        }
    }

    render () {
        return (
            <div id="mapid"></div>
        )
    }
}

export default MapContainer
